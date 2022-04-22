import React, { useCallback } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { AddEmergencyContactDialog } from './AddEmergencyContactDialog';
import { EmergencyContact } from './EmergencyContact';

type EmergencyContactFieldProps = {
  emergencyContact: EmergencyContact;
  setEmergencyContact: (emergencyContact: EmergencyContact) => void;
};

export function EmergencyContactField({
  emergencyContact,
  setEmergencyContact,
}: EmergencyContactFieldProps): JSX.Element {
  const [isAddEmergencyContactDialogOpen, setIsAddEmergencyContactDialogOpen] =
    React.useState(false);

  const handleClose = useCallback(() => {
    setIsAddEmergencyContactDialogOpen(false);
  }, []);

  const hasEmergencyContact =
    emergencyContact.name.trim().length !== 0 &&
    emergencyContact.contactNumber.trim().length !== 0;

  return (
    <div style={{ marginLeft: '1rem' }}>
      <div style={{ display: hasEmergencyContact ? '' : 'none' }}>
        <Grid container>
          <Typography variant="body2" style={{ display: 'inline', flex: 1 }}>
            {`${emergencyContact.name} ${emergencyContact.contactNumber}`}
          </Typography>
          <Button
            size="small"
            color="secondary"
            startIcon={<EditIcon />}
            style={{ marginLeft: '1rem' }}
            onClick={() => setIsAddEmergencyContactDialogOpen(true)}
          >
            Edit
          </Button>
        </Grid>
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
