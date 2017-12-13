import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from "./components/common";
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBkFJ6sl4rjxwfLAxRsnhq28RvNtkRxk8M',
            authDomain: 'authudemy-821af.firebaseapp.com',
            databaseURL: 'https://authudemy-821af.firebaseio.com',
            projectId: 'authudemy-821af',
            storageBucket: 'authudemy-821af.appspot.com',
            messagingSenderId: '581928296002'
        });
    }

    render() {
        return (
            <View >
                <Header headerText='Authentication'/>
                <LoginForm />
            </View>
        );
    }
}

export default App;
