import React from 'react';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddEmergencyContactDialog from './AddEmergencyContactDialog';
import { EmergencyContact } from './EmergencyContact';

type EmergencyContactFieldProps = {
  emergencyContact: EmergencyContact;
  setEmergencyContact: (emergencyContact: EmergencyContact) => void;
};

function EmergencyContactField({
  emergencyContact,
  setEmergencyContact,
}: EmergencyContactFieldProps): JSX.Element {
  const [
    isAddEmergencyContactDialogOpen,
    setIsAddEmergencyContactDialogOpen,
  ] = React.useState(false);

  function handleClose() {
    setIsAddEmergencyContactDialogOpen(false);
  }

  const hasEmergencyContact =
    emergencyContact.name.trim().length !== 0 &&
    emergencyContact.contactNumber.trim().length !== 0;

  return (
    <div style={{ marginLeft: '1rem' }}>
      <div style={{ display: hasEmergencyContact ? '' : 'none' }}>
        <Typography variant="body2" style={{ display: 'inline' }}>
          {`${emergencyContact.name} ${emergencyContact.contactNumber}`}
        </Typography>
        <Button
          size="small"
          color="primary"
          style={{ marginLeft: '1rem' }}
          onClick={() => setIsAddEmergencyContactDialogOpen(true)}
        >
          Edit
        </Button>
      </div>
      <div style={{ display: hasEmergencyContact ? 'none' : '' }}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddEmergencyContactDialogOpen(true)}
        >
          Add
        </Button>
      </div>
      <AddEmergencyContactDialog
        open={isAddEmergencyContactDialogOpen}
        emergencyContact={emergencyContact}
        handleClose={handleClose}
        addEmergencyContact={setEmergencyContact}
      />
    </div>
  );
}

export default EmergencyContactField;
