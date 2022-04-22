import React from 'react';
import { Typography } from '@material-ui/core';
import { HeadedSection } from './HeadedSection';
import { EmergencyContact } from './EmergencyContact';
import { EmergencyContactField } from './EmergencyContactField';

type EmergencyContactsPropsType = {
  onSiteEmergencyContact: EmergencyContact;
  setOnSiteEmergencyContact: (emergencyContact: EmergencyContact) => void;
  offSiteEmergencyContact: EmergencyContact;
  setOffSiteEmergencyContact: (emergencyContact: EmergencyContact) => void;
};

export function EmergencyContacts({
  onSiteEmergencyContact,
  setOnSiteEmergencyContact,
  offSiteEmergencyContact,
  setOffSiteEmergencyContact,
}: EmergencyContactsPropsType): JSX.Element {
  return (
    // <Card>
    //   <CardContent>
    <HeadedSection title="Emergency Contacts">
      {/* <Typography gutterBottom variant="h5" component="h2">
        Emergency Contacts
      </Typography> */}
      <Typography variant="body2" color="textSecondary">
        On-site:
      </Typography>
      <EmergencyContactField
        emergencyContact={onSiteEmergencyContact}
        setEmergencyContact={setOnSiteEmergencyContact}
      />
      <Typography variant="body2" color="textSecondary">
        Off-site:
      </Typography>
      <EmergencyContactField
        emergencyContact={offSiteEmergencyContact}
        setEmergencyContact={setOffSiteEmergencyContact}
      />
    </HeadedSection>
    //   </CardContent>
    // </Card>
  );
}
