import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import Shooters from './Shooters';
import CampHelpers from './CampHelpers';
import CampingSummary from './CampingSummary';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';

function App() {
  
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

export default App;
