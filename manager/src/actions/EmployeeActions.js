import {
    EMPLOYEE_CREATE,
    EMPLOYEE_UPDATE,
    EMPLOYEE_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // path to our json database on firebase
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.pop();
            })
    }
};

export const employeeFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => { // this will `watch` the event for the entire lifecycle of our application,
                // and whenever there a new value coming to the url under that ref, this action will be automatically dispatched to our reducers
                dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() }) // snapshot.val() returns an object, not an array
            })
    }
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // path to our json database on firebase
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.pop();
            })
    }
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // path to our json database on firebase
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                // we don't need to dispatch any action, since employeeFetch is listening on the event of any change to the
                // employee db on firebase, so this delete event will trigger EMPLOYEE_FETCH_SUCCESS been dispatched already
                // dispatch({ type: EMPLOYEE_DELETE_SUCCESS });
                Actions.pop();
            })
    }
};