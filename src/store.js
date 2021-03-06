import { createStore, combineReducers, compose } from 'redux';
import 'firebase/firestore';
import 'firebase/functions';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase';

// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

// react-redux-firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA1ZCEPNUpnaZ6rihn5gI2EVjDZJ8IMmg8",
    authDomain: "reactclientpanel-83c29.firebaseapp.com",
    databaseURL: "https://reactclientpanel-83c29.firebaseio.com",
    projectId: "reactclientpanel-83c29",
    storageBucket: "reactclientpanel-83c29.appspot.com",
    messagingSenderId: "484506746785"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
    // Default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    };

    // Set to localStorate
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = {
    settings: JSON.parse(localStorage.getItem('settings'))
};

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;