import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';


class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDa7Ndp0QIgjdwG2OzCIK7Mjtbb7MpS9_c',
            authDomain: 'managerudemy-49eb8.firebaseapp.com',
            databaseURL: 'https://managerudemy-49eb8.firebaseio.com',
            projectId: 'managerudemy-49eb8',
            storageBucket: 'managerudemy-49eb8.appspot.com',
            messagingSenderId: '881599474740'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default App;