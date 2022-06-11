import React, { useRef } from 'react';
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
  Stack,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
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
  const canSubmit = useRef(false);

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
    validate: (values) => {
      const hasName = values.name.trim().length > 0;
      const hasContactNumber = values.contactNumber.trim().length > 0;

      canSubmit.current = hasName && hasContactNumber;

      const errors: FormikErrors<EmergencyContact> = {};
      if (!hasName) {
        errors.name = 'Required';
      }
      if (!hasContactNumber) {
        errors.contactNumber = 'Required';
      }

      return errors;
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        name: emergencyContact.name,
        contactNumber: emergencyContact.contactNumber,
      },
    });
    const hasName = emergencyContact.name.trim().length > 0;
    const hasContactNumber = emergencyContact.contactNumber.trim().length > 0;

    canSubmit.current = hasName && hasContactNumber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyContact]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          <Stack spacing={1} marginTop={1}>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClose}
            color="primary"
            disabled={!canSubmit.current}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
