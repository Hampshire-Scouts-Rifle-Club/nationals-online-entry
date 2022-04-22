import React from 'react';
import {
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import { EmergencyContact } from './EmergencyContact';

type EmergencyContactPropsType = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  emergencyContact: EmergencyContact;
  addEmergencyContact: (emergencyContact: EmergencyContact) => void;
};

export function AddEmergencyContactDialog({
  open,
  handleClose,
  emergencyContact,
  addEmergencyContact,
}: EmergencyContactPropsType): JSX.Element {
  const formik = useFormik({
    initialValues: {
      name: emergencyContact.name,
      contactNumber: emergencyContact.contactNumber,
    },
    onSubmit: (values) => {
      const newEmergencyContact: EmergencyContact = {
        name: values.name,
        contactNumber: values.contactNumber,
      };
      addEmergencyContact(newEmergencyContact);
    },
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <DialogTitle id="responsive-dialog-title">
          Emergency Contact
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            wrap="wrap"
          >
            <Grid item>
              <TextField
                id="name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item>
              <TextField
                id="contactNumber"
                label="Contact number"
                onChange={formik.handleChange}
                value={formik.values.contactNumber}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
