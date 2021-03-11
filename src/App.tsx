import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';
import Shooters from './Shooters';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { EmptyCampBooking } from './CampBooking';
import { EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import SaveState from './SaveState';

function App(): JSX.Element {
  const usePersistedEntriesState = createPersistedState(
    'scoutnationalsentries'
  );
  const usePersistedCampBookingState = createPersistedState(
    'scoutnationalscampbooking'
  );
  const usePersistedOnSiteEmergencyContactState = createPersistedState(
    'scoutnationalsonsitemergencycontact'
  );
  const usePersistedOffSiteEmergencyContactState = createPersistedState(
    'scoutnationalsoffsitemergencycontact'
  );

  const [allEntries, setAllEntries] = usePersistedEntriesState(
    [] as IndividualEntry[]
  );
  const [campBooking, setCampBooking] = usePersistedCampBookingState(
    EmptyCampBooking
  );
  const [
    onSiteEmergencyContact,
    setOnSiteEmergencyContact,
  ] = usePersistedOnSiteEmergencyContactState(EmptyEmergencyContact);
  const [
    offSiteEmergencyContact,
    setOffSiteEmergencyContact,
  ] = usePersistedOffSiteEmergencyContactState(EmptyEmergencyContact);

  function handleReset() {
    setAllEntries([]);
    setCampBooking(EmptyCampBooking);
    setOnSiteEmergencyContact(EmptyEmergencyContact);
    setOffSiteEmergencyContact(EmptyEmergencyContact);
  }

  return (
    <div className="App">
      <TopBar resetHandler={handleReset} />
      <Container maxWidth="sm">
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
