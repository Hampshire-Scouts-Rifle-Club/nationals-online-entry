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
  Stack,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import {
  isPostalAddressComplete,
  normaliseAddressBlock,
  PostalAddress,
} from './PostalAddress';

type AddMedalAddressDialogProps = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  medalPostalAddress: PostalAddress;
  setMedalPostalAddress: (medalPostalAddress: PostalAddress) => void;
};

export function AddMedalAddressDialog({
  open,
  handleClose,
  medalPostalAddress,
  setMedalPostalAddress,
}: AddMedalAddressDialogProps): JSX.Element {
  const canSubmit = useRef(false);

  const formik = useFormik({
    initialValues: {
      addresseeName: medalPostalAddress.addresseeName,
      address: medalPostalAddress.address,
    },
    onSubmit: (values) => {
      const newMedalPostalAddress: PostalAddress = {
        addresseeName: values.addresseeName,
        address: normaliseAddressBlock(values.address),
      };
      setMedalPostalAddress(newMedalPostalAddress);
    },
    validate: (values) => {
      canSubmit.current = isPostalAddressComplete(values);

      const errors: FormikErrors<PostalAddress> = {};
      if (values.addresseeName.trim().length === 0) {
        errors.addresseeName = 'Required';
      }
      if (values.address.trim().length === 0) {
        errors.address = 'Required';
      }

      return errors;
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        addresseeName: medalPostalAddress.addresseeName,
        address: medalPostalAddress.address,
      },
    });
    canSubmit.current = isPostalAddressComplete(medalPostalAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medalPostalAddress]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <DialogTitle id="responsive-dialog-title">
          Address for Medals
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1} marginTop={1}>
            <TextField
              id="addresseeName"
              label="Name"
              fullWidth
              value={formik.values.addresseeName}
              onChange={formik.handleChange}
            />
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={(event) => {
                formik.handleBlur(event);
                // An address typed on one line with commas is rewritten as one
                // line of the address per line once the entrant leaves the box.
                formik.setFieldValue(
                  'address',
                  normaliseAddressBlock(event.target.value),
                );
              }}
            />
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
