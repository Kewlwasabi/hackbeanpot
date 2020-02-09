import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currOcc: null,
      maxOcc: null,
      kudos: null,
      name: null,
      init: 'false'
    };
  }

  compo

  //this is called after inital DOM
  componentDidMount() {
    const classRef = firebase.database().ref().child('Classroom').child('SN11');
    const occRef = classRef.child('currOcc');
    const maxRef = classRef.child('maxOcc');
    occRef.on('value', snap => {
      this.setState({
        currOcc: snap.val()
      });
    });
    maxRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val()
      });
    });

    console.log(this.state.init === 'false')
    if(this.state.init === 'false') {
      console.log('auth ran')
      this.handleAuth();
    }
    
  }

  handleAuth = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      const rootRef = firebase.database().ref();
      const fooRef = rootRef.child("Users");
      fooRef.once("value", snap => {
        const foo = snap.val();
        if (foo !== null && this.state.init === 'false') {
          Object.keys(foo).forEach(key => {
            // The ID is the key
            console.log(key);
            // The Object is foo[key]

            //if name is in database
            if (firebase.auth().currentUser.displayName.localeCompare(foo[key]['name']) == 0
            && this.state.init === 'false') {
              console.log('user found in database!')
              console.log(firebase.auth().currentUser.displayName)
              console.log(foo[key]['name'])
              //increment kudos in database

              fooRef.child(key).once('value', snap => {
                console.log(snap.child("kudos").val());
                var kudos = snap.child('kudos').val()
                snap.ref.update({
                  kudos: kudos + 1
                  })
              });
              //change init flag to true
              this.setState ({
                init: 'true'
              });
            }
          });
          //set new user
          if(this.state.init === 'false') {
            const userRef = firebase.database().ref().child('Users');
            userRef.child(user.uid).set({
              name: user.displayName,
              kudos: 0,
              email: user.email
            })
            //set init flag to true
            this.setState ({
                init: 'true'
              });
          }
        }
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    firebase.database().ref().child('Classroom').child('SN11').update({
      currOcc: 11,
      maxOcc: 12
    });
 }

  render() {
    return (
      <div className="App">
        <head>
          <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
        </head>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.handleSubmit} >Occupied/Leave</button>
          <p>
            {this.state.currOcc}
            {this.state.maxOcc}
            {this.state.name}
            {this.state.kudos}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
