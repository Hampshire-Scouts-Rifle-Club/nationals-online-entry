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
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useFormik } from 'formik';
import { Shooter } from './Shooter';

// type ShootingEventType = {
//   title: string;
//   slots: number;
//   cost: number;
//   description: string;
// };

type ShooterPropsType = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  addShooter: (shooter: Shooter) => void;
  shooter: Shooter;
  // eventsEntered?: ShootingEventType[];
  // allScoutGroups?: string[];
  // allEvents?: ShootingEventType[];
};

export function AddShooterDialog({
  open,
  handleClose,
  shooter,
  addShooter,
}: ShooterPropsType): JSX.Element {
  const formik = useFormik({
    initialValues: {
      firstName: shooter.firstName,
      lastName: shooter.lastName,
      dateOfBirth: shooter.dateOfBirth,
      didEnterLastYear: shooter.didEnterLastYear,
      isRangeOfficer: shooter.isRangeOfficer,
      scoutGroup: shooter.scoutGroup,
    },
    onSubmit: (values) => {
      const newShooter: Shooter = {
        id: `${values.firstName}-${values.lastName}-${values.scoutGroup}`,
        firstName: values.firstName,
        lastName: values.lastName,
        didEnterLastYear: values.didEnterLastYear,
        dateOfBirth: values.dateOfBirth,
        scoutGroup: values.scoutGroup,
        county: '',
        isRangeOfficer: values.isRangeOfficer,
        rangeOfficerProofUrl: '',
      };
      addShooter(newShooter);
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
        <DialogTitle id="responsive-dialog-title">Add Shooter</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            wrap="wrap"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="baseline"
            >
              <Grid item>
                <TextField
                  id="firstName"
                  label="First name"
                  onChange={formik.handleChange}
                >
                  {formik.values.firstName}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="lastName"
                  label="Last name"
                  onChange={formik.handleChange}
                >
                  {formik.values.lastName}
                </TextField>
              </Grid>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="date-of-birth"
                  disableFuture
                  variant="inline"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={['year', 'month', 'date']}
                  value={
                    formik.values.dateOfBirth &&
                    new Date(formik.values.dateOfBirth)
                  }
                  onChange={(date) => {
                    formik.setFieldValue('dateOfBirth', date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="didEnterLastYear"
                    checked={formik.values.didEnterLastYear}
                    onChange={formik.handleChange}
                  />
                }
                label="Entered last year"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isRangeOfficer"
                    checked={formik.values.isRangeOfficer}
                    onChange={formik.handleChange}
                  />
                }
                label="Range officer"
              />
            </Grid>
            <Grid item>
              <TextField
                id="scoutGroup"
                label="Scout group"
                onChange={formik.handleChange}
              >
                {formik.values.scoutGroup}
              </TextField>
            </Grid>
          </Grid>
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

// AddShooterDialog.defaultProps = {
//   eventsEntered: [],
//   allScoutGroups: [],
//   allEvents: [],
// };

export default AddShooterDialog;
