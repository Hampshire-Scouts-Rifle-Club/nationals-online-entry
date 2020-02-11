import React, { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import Amplify, { Hub, Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import CampingSummary from './CampingSummary';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';

Amplify.configure(awsconfig);

function App() {

  const [state, setState] = useState({ user: null, customState: null });

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    })
  });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
      
  const handleSignIn = () => {
    Auth.federatedSignIn().then(cred => {
      // If success, you will get the AWS credentials
      console.log(cred);
      return Auth.currentAuthenticatedUser();
      }).then(user => {
        // If success, the user object you passed in Auth.federatedSignIn
        console.log(user);
        }).catch(e => {
          console.log(e)
        })
  };

  return (
    <div className="App">
    <button onClick={() => 
    Auth.federatedSignIn().then({ handleSignIn })}>Sign In</button>
    <Container maxWidth="sm">
      <Shooters/>
      <CampHelpers/>
      <CampingSummary/>
      <EmergencyContacts/>
      <Permissions/>
    </Container>
        
    </div>
  );
}

export default App;
