import { CampBooking } from './CampBooking';
import { EmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import { PostalAddress } from './PostalAddress';

export type TeamEntry = {
  allEntries: IndividualEntry[];
  campBooking: CampBooking;
  onSiteEmergencyContact: EmergencyContact;
  offSiteEmergencyContact: EmergencyContact;
  // Where the team's medals are posted. Optional because entries submitted
  // before the 2026 postal competition have no address at all, and every
  // year's entries share one table.
  medalPostalAddress?: PostalAddress;
};
