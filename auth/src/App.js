import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from "./components/common";
import LoginForm from './components/LoginForm';
import {CardSection} from "./components/common/CardSection";

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBkFJ6sl4rjxwfLAxRsnhq28RvNtkRxk8M',
            authDomain: 'authudemy-821af.firebaseapp.com',
            databaseURL: 'https://authudemy-821af.firebaseio.com',
            projectId: 'authudemy-821af',
            storageBucket: 'authudemy-821af.appspot.com',
            messagingSenderId: '581928296002'
        });

        firebase.auth().onAuthStateChanged((user) => {
            // when signing in, there's an 'user' object, when signing out however, 'user' will be undefined
            if (user){
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        })
    }

    renderContent(){
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                    );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }
    }

    render() {
        return (
            <View >
                <Header headerText='Authentication'/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
