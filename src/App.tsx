import React from 'react';
// import { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

// import { Hub, Auth } from 'aws-amplify';
// import { Rehydrated } from "aws-appsync-react";

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { Shooter } from './Shooter';
import { CampHelper } from './CampHelper';

function App(): JSX.Element {
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

  const [allShooters, setAllShooters] = React.useState([] as Shooter[]);
  const [campHelpers, setCampHelpers] = React.useState([] as CampHelper[]);

  return (
    <div className="App">
      <TopBar />
      <Container maxWidth="sm">
        <Shooters allShooters={allShooters} setAllShooters={setAllShooters} />
        <Camping />
        <CampHelpers
          campHelpers={campHelpers}
          setCampHelpers={setCampHelpers}
        />
        <EmergencyContacts />
        <Permissions />
      </Container>
    </div>
  );
}

export default App;
