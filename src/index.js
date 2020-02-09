
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCrUNnrivRJdTFAg7CishPGMWERg8-w5PE",
  authDomain: "studyhusky-6f7ea.firebaseapp.com",
  databaseURL: "https://studyhusky-6f7ea.firebaseio.com",
  projectId: "studyhusky-6f7ea",
  storageBucket: "studyhusky-6f7ea.appspot.com",
  messagingSenderId: "130656696751",
  appId: "1:130656696751:web:b999f0760bf7a4a30cd75a",
  measurementId: "G-6JZ82C8LPF"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
