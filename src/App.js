import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; // if you are using Amplify CLI

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import CampingSummary from './CampingSummary';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';

function App() {

  Amplify.configure(awsconfig);
  
  return (
    <div className="App">
    
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

export default withAuthenticator(App, {includeGreetings: true});
