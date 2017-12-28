import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from  './components/common';
import LibraryList from './components/LibraryList';

const App = () => {
    return (
        // Provider component can only have one children component, so we need to wrap them up to one (here, View)
        <Provider store={createStore(reducers)}>
            <View style={{ flex: 1 }}>
                <Header headerText="Tech Stack"/>
                <LibraryList/>
            </View>
        </Provider>
    )
};

export default App;