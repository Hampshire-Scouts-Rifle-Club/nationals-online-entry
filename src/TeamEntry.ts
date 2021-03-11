import { CampBooking } from './CampBooking';
import { EmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';

export type TeamEntry = {
  allEntries: IndividualEntry[];
  campBooking: CampBooking;
  onSiteEmergencyContact: EmergencyContact;
  offSiteEmergencyContact: EmergencyContact;
};
