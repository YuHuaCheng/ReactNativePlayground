import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
    state = { email: '', password: '' , error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => { // failed to sign in
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {

        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false })
    }

    renderButton() {
        if (this.state.loading){
            return (
                <Spinner size="small"/>
            )
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        )
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='user@gmail.com'
                        value={this.state.email}
                        onChangeText={ email => this.setState( { email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label='Password'
                        placeholder='password'
                        value={this.state.password}
                        onChangeText={ password => this.setState( { password })}
                        secureTextEntry // boolean property can be written in this syntax to have {true} value
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
};

export default LoginForm;