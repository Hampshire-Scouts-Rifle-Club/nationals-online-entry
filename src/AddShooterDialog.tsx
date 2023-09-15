import React, { useCallback, useRef, useState } from 'react';
import {
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Divider,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormikErrors, useFormik } from 'formik';
import { DatePicker } from '@mui/lab';
import { EmptyShooter, Shooter } from './Shooter';
import { ConfirmDialog } from './ConfirmDialog';
import { calculateAge, earliestDateOfBirthForAge } from './AgeUtils';
import { CompetitionDate, RoDiscount } from './CompetitionConstants';
import { InfoDialog } from './InfoDialog';

interface ShooterProps {
  open: boolean;
  handleClose: () => void;
  setShooter: (shooter: Shooter) => void;
  shooter: Shooter;
  submitHandler: (shooter: Shooter) => void;
  actionButtonTitle: string;
  title: string;
  showDelete?: boolean;
  deleteShooter?: (shooter: Shooter) => void;
}

const rangeOfficerInfoTitle = 'Range Officers';
const rangeOfficerInfoParagraphs = [
  'There is a substantial requirement for Range Officer support in order to operate all of the activities, and all qualified adults will be expected to support that requirement by serving allocated periods on a range.',
  'To encourage this, a £12 reduction in entry fees can be claimed for all range-officer-qualified adults who provide that level of support.',
  'The reduction cannot be claimed for any individual if they do not support the requirement for assistance on the ranges.',
];

export function AddShooterDialog({
  open,
  handleClose,
  shooter,
  setShooter,
  submitHandler,
  actionButtonTitle,
  title,
  showDelete = false,
  deleteShooter,
}: ShooterProps): JSX.Element {
  const canSubmit = useRef(false);

  const [isRangeOfficerInfoDialogOpen, setIsRangeOfficerInfoDialogOpen] =
    useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: shooter.firstName,
      lastName: shooter.lastName,
      dateOfBirth: shooter.dateOfBirth,
      isOver18: shooter.isOver18,
      previousCompetitorNumber: shooter.previousCompetitorNumber,
      isRangeOfficer: shooter.isRangeOfficer,
      scoutGroup: shooter.scoutGroup,
    },
    onSubmit: (values) => {
      const isAdultOnCompetitionDate =
        calculateAge(new Date(formik.values.dateOfBirth), CompetitionDate) >=
        18;
      const newShooter: Shooter = {
        id: `${values.firstName.trim()}-${values.lastName.trim()}-${values.scoutGroup.trim()}`,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        previousCompetitorNumber: values.previousCompetitorNumber,
        dateOfBirth: values.dateOfBirth,
        isOver18: values.isOver18,
        scoutGroup: values.scoutGroup.trim(),
        county: '',
        isRangeOfficer: isAdultOnCompetitionDate && values.isRangeOfficer,
        rangeOfficerProofUrl: '',
      };
      setShooter(newShooter);
      submitHandler(newShooter);
      formik.resetForm({ values: EmptyShooter });
    },
    validate: (values) => {
      const errors: FormikErrors<Shooter> = {};

      canSubmit.current = isValid(
        values.firstName,
        values.lastName,
        values.scoutGroup,
        values.isOver18,
        values.dateOfBirth
      );

      const hasFirstName = values.firstName.trim().length > 0;
      const hasLastName = values.lastName.trim().length > 0;
      const hasScoutGroup = values.scoutGroup.trim().length > 0;
      const hasValidDateOfBirth =
        values.isOver18 || !isAdultDuringCompetiton(values.dateOfBirth);

      if (!hasFirstName) {
        errors.firstName = 'Required';
      }
      if (!hasLastName) {
        errors.lastName = 'Required';
      }
      if (!hasScoutGroup) {
        errors.scoutGroup = 'Required';
      }
      if (!hasValidDateOfBirth) {
        errors.dateOfBirth = `Must be under 18 on ${new Date(
          CompetitionDate
        ).toLocaleDateString()}`;
      }

      return errors;
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        firstName: shooter.firstName,
        lastName: shooter.lastName,
        dateOfBirth: shooter.dateOfBirth,
        isOver18: shooter.isOver18,
        previousCompetitorNumber: shooter.previousCompetitorNumber,
        isRangeOfficer: shooter.isRangeOfficer,
        scoutGroup: shooter.scoutGroup,
      },
    });
    canSubmit.current = isValid(
      shooter.firstName,
      shooter.lastName,
      shooter.scoutGroup,
      shooter.isOver18,
      shooter.dateOfBirth
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shooter]);

  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState(false);

  const handleDeleteShooter = useCallback(() => {
    if (deleteShooter) {
      deleteShooter(shooter);
    }
    handleClose();
  }, [deleteShooter, handleClose, shooter]);

  const numbersOnlyTextChangeHandler = useCallback(
    (event) => {
      const target = event.currentTarget;
      target.value = target.value.replace(/[^0-9]/, '');
      formik.handleChange(event);
    },
    [formik]
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isAdultOnCompetitionDate = isAdultDuringCompetiton(
    formik.values.dateOfBirth
  );

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} marginTop={1}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={1}
              >
                <Grid item>
                  <TextField
                    id="firstName"
                    label="First name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="lastName"
                    label="Last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  id="scoutGroup"
                  label="Scout group"
                  value={formik.values.scoutGroup}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isOver18"
                      checked={formik.values.isOver18}
                      onChange={formik.handleChange}
                    />
                  }
                  label={`Over 18 on ${new Date(
                    CompetitionDate
                  ).toLocaleDateString()}`}
                />
              </Grid>
              {!formik.values.isOver18 && (
                <>
                  <div>
                    <Typography variant="subtitle1">
                      <strong>Under 18</strong>
                    </Typography>
                    <Divider />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => <TextField {...props} />}
                      className="date-of-birth"
                      disableFuture
                      minDate={earliestDateOfBirthForAge(18, CompetitionDate)}
                      inputFormat="dd/MM/yyyy"
                      label="Date of birth"
                      views={['year', 'month', 'day']}
                      value={
                        formik.values.dateOfBirth &&
                        new Date(formik.values.dateOfBirth)
                      }
                      onChange={(date) => {
                        formik.setFieldValue('dateOfBirth', date);
                      }}
                    />
                  </LocalizationProvider>
                  <TextField
                    id="previousCompetitorNumber"
                    label="Last Year's Competitor Number"
                    value={formik.values.previousCompetitorNumber}
                    onChange={numbersOnlyTextChangeHandler}
                    helperText="For 'most improved' prize"
                    inputProps={{ inputMode: 'numeric', maxLength: '4' }}
                  />
                </>
              )}
              {formik.values.isOver18 && (
                <>
                  <Typography variant="subtitle1">
                    <strong>Over 18</strong>
                  </Typography>
                  <Divider />
                  <div>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isRangeOfficer"
                            disabled={!isAdultOnCompetitionDate}
                            checked={
                              isAdultOnCompetitionDate &&
                              formik.values.isRangeOfficer
                            }
                            onChange={formik.handleChange}
                          />
                        }
                        label={`Range officer (£${RoDiscount} discount)`}
                      />
                    </Grid>
                    <Typography variant="caption" maxWidth="sm">
                      We need range officers to be able to run the competition.
                    </Typography>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => setIsRangeOfficerInfoDialogOpen(true)}
                    >
                      Learn more
                    </Button>
                  </div>
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            {showDelete && (
              <IconButton
                color="primary"
                onClick={() => setIsDeleteConfirmationDialogOpen(true)}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <Box flexGrow={1} />
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
              {actionButtonTitle}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        title={`Delete ${shooter.firstName} ${shooter.lastName}?`}
        description={`Do you want to delete the entry for ${shooter.firstName} ${shooter.lastName}?`}
        confirmText="Delete"
        open={isDeleteConfirmationDialogOpen}
        handleClose={() => setIsDeleteConfirmationDialogOpen(false)}
        onConfirm={handleDeleteShooter}
      />
      <InfoDialog
        title={rangeOfficerInfoTitle}
        paragraphs={rangeOfficerInfoParagraphs}
        isOpen={isRangeOfficerInfoDialogOpen}
        handleClose={() => {
          setIsRangeOfficerInfoDialogOpen(false);
        }}
      />
    </>
  );
}

function isAdultDuringCompetiton(dateOfBirthText: string) {
  let isAdultOnCompetitionDate = true;
  try {
    const ageOnCompetitionDate = calculateAge(
      new Date(dateOfBirthText),
      CompetitionDate
    );
    isAdultOnCompetitionDate = ageOnCompetitionDate >= 18;
  } catch {
    // Ignoring errors parsing incomplete date strings
  }
  return isAdultOnCompetitionDate;
}

function isValid(
  firstName: string,
  lastName: string,
  scoutGroup: string,
  isOver18: boolean,
  dateOfBirth: string
) {
  const hasFirstName = firstName.trim().length > 0;
  const hasLastName = lastName.trim().length > 0;
  const hasScoutGroup = scoutGroup.trim().length > 0;
  const hasValidDateOfBirth = isOver18 || !isAdultDuringCompetiton(dateOfBirth);

  return hasFirstName && hasLastName && hasScoutGroup && hasValidDateOfBirth;
}
