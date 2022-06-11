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
import { calculateAge } from './AgeUtils';
import { CompetitionDate, RoDiscount } from './CompetitionConstants';

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

  const formik = useFormik({
    initialValues: {
      firstName: shooter.firstName,
      lastName: shooter.lastName,
      dateOfBirth: shooter.dateOfBirth,
      previousCompetitorNumber: shooter.previousCompetitorNumber,
      isRangeOfficer: shooter.isRangeOfficer,
      scoutGroup: shooter.scoutGroup,
    },
    onSubmit: (values) => {
      const isAdultOnCompetitionDate =
        calculateAge(new Date(formik.values.dateOfBirth), CompetitionDate) >=
        18;
      const newShooter: Shooter = {
        id: `${values.firstName}-${values.lastName}-${values.scoutGroup}`,
        firstName: values.firstName,
        lastName: values.lastName,
        previousCompetitorNumber: values.previousCompetitorNumber,
        dateOfBirth: values.dateOfBirth,
        scoutGroup: values.scoutGroup,
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
      const hasFirstName = values.firstName.trim().length > 0;
      const hasLastName = values.lastName.trim().length > 0;
      const hasScoutGroup = values.scoutGroup.trim().length > 0;

      canSubmit.current = hasFirstName && hasLastName && hasScoutGroup;

      if (!hasFirstName) {
        errors.firstName = 'Required';
      }
      if (!hasLastName) {
        errors.lastName = 'Required';
      }
      if (!hasScoutGroup) {
        errors.scoutGroup = 'Required';
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
        previousCompetitorNumber: shooter.previousCompetitorNumber,
        isRangeOfficer: shooter.isRangeOfficer,
        scoutGroup: shooter.scoutGroup,
      },
    });
    canSubmit.current = isValid(
      shooter.firstName,
      shooter.lastName,
      shooter.scoutGroup
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

  let isAdultOnCompetitionDate = true;
  try {
    const ageOnCompetitionDate = calculateAge(
      new Date(formik.values.dateOfBirth),
      CompetitionDate
    );
    isAdultOnCompetitionDate = ageOnCompetitionDate >= 18;
  } catch {
    // Ignoring errors parsing incomplete date strings
  }

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
                label="2019 Competitor Number"
                value={formik.values.previousCompetitorNumber}
                onChange={numbersOnlyTextChangeHandler}
                helperText="For 'most improved' prize"
                inputProps={{ inputMode: 'numeric', maxLength: '3' }}
              />
              <div>
                <Typography variant="subtitle1">
                  <strong>Over 18</strong>
                </Typography>
                <Divider />
              </div>
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
                  target="_blank"
                  component="a"
                  href="https://www.nationalscoutriflechampionships.org.uk/rangeofficer"
                >
                  Learn more
                </Button>
              </div>
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
    </>
  );
}

function isValid(firstName: string, lastName: string, scoutGroup: string) {
  const hasFirstName = firstName.trim().length > 0;
  const hasLastName = lastName.trim().length > 0;
  const hasScoutGroup = scoutGroup.trim().length > 0;

  return hasFirstName && hasLastName && hasScoutGroup;
}
