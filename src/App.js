import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {ContainerComponent, DropdownComponent2} from './Components/ContainerComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'SN null',
      currOcc: null,
      maxOcc: null,
      kudos: null,
      name: null,
      init: 'false'
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(locVal, callback) {

    const roomRef = firebase.database().ref().child('Classroom')
    .child(locVal);
    const currOccRef = roomRef.child('currOcc');
    const maxOccRef = roomRef.child('maxOcc');
    maxOccRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val()
      }, () => {console.log("please work", snap.val())})
    });

    currOccRef.on('value', snap => {
      this.setState({
        currOcc: snap.val()
      });
    });
    this.setState({location : locVal})
  }

  // populate = (e) => {
  //   // e.preventDefault();
  //   console.log(this.state)

  // }

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

      console.log();
    }

  getClassrooms() {
    const classR = ['SN11', 'SN12', 'SN13'];
    const rootRef = firebase.database().ref();
    // return rootRef.child('Classroom').child('SN11').child('currOcc').
    rootRef.child('Classroom').on("value", snap=> {
      const foo = snap.val();
      console.log(foo);
      const dataArr = [1,2,3];
      Object.keys(foo).forEach(key => {
        console.log(key);
        let maxO = foo[key]['maxOcc'];
        let currO = foo[key]['currOcc'];
        dataArr.push({
          room: key,
          maxVal: maxO,
          curVal: currO
        });
      })
      return dataArr;
    })
  }

  getSN11() {
    const rootRef = firebase.database().ref().child('Classroom').child('SN11');
    const currOcc = rootRef.child('currOcc');
    const maxOcc = rootRef.child('maxOcc');
    var x = [0,0];
    currOcc.on('value', snap => {
      x[0] = snap.val()
    });
    maxOcc.on('value', snap => {
      x[1] = snap.val()
    });

    return x;
  }

  getSN12() {
    const rootRef = firebase.database().ref().child('Classroom').child('SN12');
    const currOcc = rootRef.child('currOcc');
    const maxOcc = rootRef.child('maxOcc');
    var x = [0,0];
    currOcc.on('value', snap => {
      x[0] = snap.val()
    });
    maxOcc.on('value', snap => {
      x[1] = snap.val()
    });
    
    return x;
  }

  getSN13() {
    const rootRef = firebase.database().ref().child('Classroom').child('SN13');
    const currOcc = rootRef.child('currOcc');
    const maxOcc = rootRef.child('maxOcc');
    var x = [0,0];
    currOcc.on('value', snap => {
      x[0] = snap.val()
    });
    maxOcc.on('value', snap => {
      x[1] = snap.val()
    });
    
    return x;
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
              fooRef.child(key).once('value', snap => {
                this.setState({
                  kudos: snap.child('kudos').val()
                });
              }              )
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

  handleSubmitAdd = (e) => {
    // e.preventDefault();
    if (this.state.currOcc == this.state.maxOcc) {
      alert('Max occupency reached')
    }
    else {
      firebase.database().ref().child('Classroom').child(this.state.location).update({
        currOcc: this.state.currOcc + 1
      });
    }
  }

  handleSubmitSub = (e) => {
    // e.preventDefault();
    if (this.state.currOcc == 0) {
      alert('There is nobody in this room');
    }
    else {
      firebase.database().ref().child('Classroom').child(this.state.location).update({
        currOcc: this.state.currOcc - 1
      });
    }
  }
  

  render() {
    return (
      <div className="App">
        {/*}<header className="App-header">
        <button onClick=
        {this.populate}
        >Populate</button>
        <button onClick=
        {this.handleSubmitAdd}
        >Occupy</button>
        <button onClick=
        {this.handleSubmitSub}
        >Leave</button>
        <p>
        {this.state.currOcc}
        </p>
        <p>
        {this.state.maxOcc}
        </p>
        </header>*/}
        <ContainerComponent onLocChange = {this.handleLocationChange}
          populate = {this.populate} submitAdd = {this.handleSubmitAdd}
          submitSub= {this.handleSubmitSub} kudos = {this.state.kudos}
          maxOcc={this.state.maxOcc} sn11={this.getSN11()} sn12={this.getSN12()} sn13={this.getSN13()}/>
      </div>
    );
  }
}

export default App;
