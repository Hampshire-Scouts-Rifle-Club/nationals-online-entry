import React from 'react';
// import { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';

// import { Hub, Auth } from 'aws-amplify';
// import { Rehydrated } from "aws-appsync-react";

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { CampHelper } from './CampHelper';
import { EmptyCampBooking } from './CampBooking';
import { EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';

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

  const usePersistedState = createPersistedState('scoutnationalsentry');

  const [allEntries, setAllEntries] = usePersistedState(
    [] as IndividualEntry[]
  );
  const [campHelpers, setCampHelpers] = React.useState([] as CampHelper[]);
  const [campBooking, setCampBooking] = React.useState(EmptyCampBooking);
  const [onSiteEmergencyContact, setOnSiteEmergencyContact] = React.useState(
    EmptyEmergencyContact
  );
  const [offSiteEmergencyContact, setOffSiteEmergencyContact] = React.useState(
    EmptyEmergencyContact
  );

  return (
    <div className="App">
      <TopBar />
      <Container maxWidth="sm">
        <Shooters allEntries={allEntries} setAllEntries={setAllEntries} />
        <Camping campBooking={campBooking} setCampBooking={setCampBooking} />
        <CampHelpers
          campHelpers={campHelpers}
          setCampHelpers={setCampHelpers}
        />
        <EmergencyContacts
          onSiteEmergencyContact={onSiteEmergencyContact}
          setOnSiteEmergencyContact={setOnSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
          setOffSiteEmergencyContact={setOffSiteEmergencyContact}
        />
        <Permissions />
      </Container>
    </div>
  );
}

export default App;
