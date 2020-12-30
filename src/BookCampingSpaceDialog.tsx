import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogContentText,
} from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import { CampBooking } from './CampBooking';

type BookCampingSpaceDialogProps = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  campBooking: CampBooking;
  setCampBooking: (campBooking: CampBooking) => void;
};

export function BookCampingSpaceDialog({
  open,
  handleClose,
  campBooking,
  setCampBooking,
}: BookCampingSpaceDialogProps): JSX.Element {
  const formik = useFormik({
    initialValues: {
      numberOfPeopleCamping: campBooking.numberOfCampers,
      estimatedArrivalTime: campBooking.estimatedArrivalTime,
      otherInformation: campBooking.anyOtherInfo,
    },
    onSubmit: (values) => {
      const newCampBooking: CampBooking = {
        numberOfCampers: values.numberOfPeopleCamping,
        estimatedArrivalTime: values.estimatedArrivalTime,
        anyOtherInfo: values.otherInformation,
      };
      setCampBooking(newCampBooking);
    },
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="responsive-dialog-title">
          Book Camping Space
        </DialogTitle>
        <DialogContent>
          <TextField
            id="numberOfPeopleCamping"
            label="How many people are camping?"
            type="number"
            fullWidth
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={formik.handleChange}
          >
            {formik.values.numberOfPeopleCamping}
          </TextField>
          <TextField
            id="estimatedArrivalTime"
            label="Estimated arrival time"
            onChange={formik.handleChange}
          >
            {formik.values.estimatedArrivalTime}
          </TextField>
          <TextField
            id="otherInformation"
            label="Any other information?"
            variant="outlined"
            fullWidth
            multiline
            style={{ marginTop: '1rem' }}
            rows={4}
            onChange={formik.handleChange}
          >
            {formik.values.otherInformation}
          </TextField>
          <DialogContentText variant="caption" style={{ marginTop: '1rem' }}>
            All adult camp helpers must be listed on the main page to show Scout
            DBS check.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

export default BookCampingSpaceDialog;
