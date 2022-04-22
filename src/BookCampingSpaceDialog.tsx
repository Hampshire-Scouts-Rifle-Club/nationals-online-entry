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
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
            value={formik.values.numberOfPeopleCamping}
            onChange={formik.handleChange}
          />
          <TextField
            id="estimatedArrivalTime"
            label="Estimated arrival time"
            value={formik.values.estimatedArrivalTime}
            onChange={formik.handleChange}
          />
          <TextField
            id="otherInformation"
            label="Any other information?"
            variant="outlined"
            fullWidth
            multiline
            style={{ marginTop: '1rem' }}
            rows={4}
            value={formik.values.otherInformation}
            onChange={formik.handleChange}
          />
          <DialogContentText variant="caption" style={{ marginTop: '1rem' }}>
            All adult camp helpers must be listed on the main page to show Scout
            DBS check.
          </DialogContentText>
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
