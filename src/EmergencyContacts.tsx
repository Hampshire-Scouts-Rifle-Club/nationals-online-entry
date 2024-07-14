import { Skeleton, Typography } from "@mui/material";
import { HeadedSection } from "./HeadedSection";
import { EmergencyContact } from "./EmergencyContact";
import { EmergencyContactField } from "./EmergencyContactField";

interface EmergencyContactsPropsType {
  onSiteEmergencyContact: EmergencyContact;
  setOnSiteEmergencyContact: (emergencyContact: EmergencyContact) => void;
  offSiteEmergencyContact: EmergencyContact;
  setOffSiteEmergencyContact: (emergencyContact: EmergencyContact) => void;
  showPlaceHolder: boolean;
  isEntryLocked: boolean;
}

export function EmergencyContacts({
  onSiteEmergencyContact,
  setOnSiteEmergencyContact,
  offSiteEmergencyContact,
  setOffSiteEmergencyContact,
  showPlaceHolder,
  isEntryLocked,
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
      {showPlaceHolder ? (
        <Skeleton variant="text" />
      ) : (
        <EmergencyContactField
          emergencyContact={onSiteEmergencyContact}
          setEmergencyContact={setOnSiteEmergencyContact}
          isReadOnly={isEntryLocked}
        />
      )}
      <Typography variant="body2" color="textSecondary">
        Off-site:
      </Typography>
      {showPlaceHolder ? (
        <Skeleton variant="text" />
      ) : (
        <EmergencyContactField
          emergencyContact={offSiteEmergencyContact}
          setEmergencyContact={setOffSiteEmergencyContact}
          isReadOnly={isEntryLocked}
        />
      )}
    </HeadedSection>
    //   </CardContent>
    // </Card>
  );
}
