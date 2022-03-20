import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
import Shooters from './Shooters';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { CampBooking, EmptyCampBooking } from './CampBooking';
import { EmergencyContact, EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import SaveState from './SaveState';

function App(): JSX.Element {
  const usePersistedEntriesState = createPersistedState<IndividualEntry[]>(
    'scoutnationalsentries'
  );
  const usePersistedCampBookingState = createPersistedState<CampBooking>(
    'scoutnationalscampbooking'
  );
  const usePersistedOnSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsonsitemergencycontact'
    );
  const usePersistedOffSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsoffsitemergencycontact'
    );

  const [allEntries, setAllEntries] = usePersistedEntriesState(
    [] as IndividualEntry[]
  );
  const [campBooking, setCampBooking] =
    usePersistedCampBookingState(EmptyCampBooking);
  const [onSiteEmergencyContact, setOnSiteEmergencyContact] =
    usePersistedOnSiteEmergencyContactState(EmptyEmergencyContact);
  const [offSiteEmergencyContact, setOffSiteEmergencyContact] =
    usePersistedOffSiteEmergencyContactState(EmptyEmergencyContact);

  const handleReset = useCallback(() => {
    setAllEntries([]);
    setCampBooking(EmptyCampBooking);
    setOnSiteEmergencyContact(EmptyEmergencyContact);
    setOffSiteEmergencyContact(EmptyEmergencyContact);
  }, []);

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      const data = await Auth.currentAuthenticatedUser();
      setUser(data);
    };

    getAuthenticatedUser().catch((reason: any) => {
      console.error('Auth.currentAuthenticatedUser():');
      console.error(reason);
    });
  }, []);

  Hub.listen('auth', ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        setUser(data);
        console.log('sign in', event, data);
        break;
      case 'signOut':
        setUser(undefined);
        console.log('sign out');
        break;
      default:
        console.log('unknown auth event');
    }
  });
  // const { user, initialise: initialiseUserContext } = useUserContext();
  // initialiseUserContext();

  return (
    <div className="App">
      <TopBar resetHandler={handleReset} />
      <Container maxWidth="sm">
        <pre>
          {user ? JSON.stringify(user, null, 2) : 'No authenicated user'}
        </pre>
        <Shooters allEntries={allEntries} setAllEntries={setAllEntries} />
        <Camping campBooking={campBooking} setCampBooking={setCampBooking} />
        <EmergencyContacts
          onSiteEmergencyContact={onSiteEmergencyContact}
          setOnSiteEmergencyContact={setOnSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
          setOffSiteEmergencyContact={setOffSiteEmergencyContact}
        />
        <Permissions />
        <SaveState
          allEntries={allEntries}
          campBooking={campBooking}
          onSiteEmergencyContact={onSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
        />
      </Container>
    </div>
  );
}

export default App;
