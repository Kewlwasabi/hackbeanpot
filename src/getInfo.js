import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

function writeUserData(location, maxOcc) {
  firebase.database().ref('Classroom').child('SN11').set({
    location: location,
    maxOcc: maxOcc
  });
}

export default writeUserData
