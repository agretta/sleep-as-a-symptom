import React, {Component} from 'react'

var firebase = require("firebase");

class Username extends Component {

  constructor(props) {
   super(props);
   this.state = {
     user: ""
   };
 }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var ref = firebase.database().ref("researchers/" + user.uid);
        ref.once("value")
          .then((snapshot) => {
            if( snapshot.exists() )
            {
              this.setState({
                user : snapshot.val().first_name + ' ' + snapshot.val().last_name,
              });
            }
            // if you aren't a researcher, you must be a participant
            else
            {
              ref = firebase.database().ref("participants/" + user.uid);
              ref.once("value")
                .then((snapshot) => {
                  this.setState({
                    user : snapshot.val().first_name + ' ' + snapshot.val().last_name,
                  });
                });
            }
        });
      } else {
        // No user is signed in.
        // Don't really need to do anything here bc you will never see this page and I'm not tryna break anything
      }
    });
  }

  render() {
    return (
      <div>{this.state.user}</div>
    )
  }
}

export default Username
