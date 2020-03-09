import React from 'react';
// import { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import Amplify from 'aws-amplify';
// import { Hub, Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 
import { ApolloProvider } from "react-apollo";
// import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import AWSAppSyncClient from "aws-appsync";

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import CampingSummary from './CampingSummary';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';

Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});

function App() {

  // const [state, setState] = useState({ user: null, customState: null });

  // useEffect(() => {
  //   Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         this.setState({ user: data });
  //         break;
  //       case "signOut":
  //         this.setState({ user: null });
  //         break;
  //       case "customOAuthState":
  //         this.setState({ customState: data });
  //     }
  //   })
  // });

  //   Auth.currentAuthenticatedUser()
  //     .then(user => this.setState({ user }))
  //     .catch(() => console.log("Not signed in"));
      
  // const handleSignIn = () => {
  //   Auth.federatedSignIn().then(cred => {
  //     // If success, you will get the AWS credentials
  //     console.log(cred);
  //     return Auth.currentAuthenticatedUser();
  //     }).then(user => {
  //       // If success, the user object you passed in Auth.federatedSignIn
  //       console.log(user);
  //       }).catch(e => {
  //         console.log(e)
  //       })
  // };

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
    <div className="App">
    <TopBar/>
    <Container maxWidth="sm">
      <Shooters/>
      <CampHelpers/>
      <CampingSummary/>
      <EmergencyContacts/>
      <Permissions/>
    </Container>
        
    </div>
    </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
