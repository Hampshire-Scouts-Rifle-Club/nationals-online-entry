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
import { number, string } from 'prop-types';
import { useFormik } from 'formik';

type BookCampingSpaceDialogProps = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  bookCampingSpace: () => void;
};

export function BookCampingSpaceDialog({
  open,
  handleClose,
  bookCampingSpace,
}: BookCampingSpaceDialogProps): JSX.Element {
  const formik = useFormik({
    initialValues: {
      numberOfPeopleCamping: number,
      estimatedArrivalTime: string,
      otherInformation: string,
    },
    onSubmit: () => {
      bookCampingSpace();
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
          <DialogContentText>
            All adult camper helpers must be listed on the main page to show
            Scout DBS check.
          </DialogContentText>
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
            rows={4}
            onChange={formik.handleChange}
          >
            {formik.values.otherInformation}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </form>
    </Dialog>
  );
}

export default BookCampingSpaceDialog;
