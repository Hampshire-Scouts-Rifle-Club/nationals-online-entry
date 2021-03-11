import React from 'react';
import { CampBooking } from './CampBooking';
import { EmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import { TeamEntry } from './TeamEntry';

type SaveStateProps = {
  allEntries: IndividualEntry[];
  campBooking: CampBooking;
  onSiteEmergencyContact: EmergencyContact;
  offSiteEmergencyContact: EmergencyContact;
};

function SaveState({
  allEntries,
  campBooking,
  onSiteEmergencyContact,
  offSiteEmergencyContact,
}: SaveStateProps): JSX.Element {
  const teamEntry: TeamEntry = {
    allEntries,
    campBooking,
    onSiteEmergencyContact,
    offSiteEmergencyContact,
  };
  const teamEntryJson = JSON.stringify(teamEntry, null, 2);

  return (
    <>
      <pre>{teamEntryJson}</pre>
    </>
  );
}

export default SaveState;
