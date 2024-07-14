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
  Stack,
  Box,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { CampBooking } from './CampBooking';
import { InfoDialog } from './InfoDialog';

type BookCampingSpaceDialogProps = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  campBooking: CampBooking;
  setCampBooking: (campBooking: CampBooking) => void;
};

const campingInfoTitle = 'On-Site Camping';
const campingInfoParagraphs = [
  'For Groups (teams) wishing to camp, all camping fees are included in entries into the main event.',
  'There is no additional fee for non-shooting adults who provide camp support (such as admin or catering), although such adults must have DBS clearance and be included in the approval obtained from your GSL or DC as part of the Nights Away Notification.',
  'You will be allocated camping space based on the number of people camping. So please enter the total number of people camping, including supporting adults.',
  `If you have any special requirements or requests, please put these in 'Any other information?'`,
];

export function BookCampingSpaceDialog({
  open,
  handleClose,
  campBooking,
  setCampBooking,
}: BookCampingSpaceDialogProps): JSX.Element {
  const canSubmit = useRef(false);

  const [isCampingInfoDialogOpen, setIsCampingInfoDialogOpen] = useState(false);

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
    validate: (values) => {
      const hasNumberOfPeopleCamping = values.numberOfPeopleCamping > 0;
      const hasEstimatedArrivalTime =
        values.estimatedArrivalTime.trim().length > 0;

      canSubmit.current = hasNumberOfPeopleCamping && hasEstimatedArrivalTime;

      const errors: FormikErrors<CampBooking> = {};
      if (!hasNumberOfPeopleCamping) {
        errors.numberOfCampers = 'Required';
      }
      if (!hasEstimatedArrivalTime) {
        errors.estimatedArrivalTime = 'Required';
      }

      return errors;
    },
  });

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
          Book Camping Space
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1} marginTop={1}>
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
              Remember to submit a{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/search?q=scouts+nights+away+notification"
              >
                NAN
              </a>{' '}
              for this event.
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => setIsCampingInfoDialogOpen(true)}
          >
            About camping
          </Button>
          <Box flexGrow={1} />
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClose}
            disabled={!canSubmit.current}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
      <InfoDialog
        title={campingInfoTitle}
        paragraphs={campingInfoParagraphs}
        isOpen={isCampingInfoDialogOpen}
        handleClose={() => {
          setIsCampingInfoDialogOpen(false);
        }}
      />
    </Dialog>
  );
}
