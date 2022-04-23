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
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/lab';
import { Shooter } from './Shooter';

type ShooterPropsType = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setShooter: (shooter: Shooter) => void;
  shooter: Shooter;
  submitHandler: (shooter: Shooter) => void;
  actionButtonTitle: string;
  title: string;
};

export function AddShooterDialog({
  open,
  handleClose,
  shooter,
  setShooter,
  submitHandler,
  actionButtonTitle,
  title,
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
      setShooter(newShooter);
      submitHandler(newShooter);
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        firstName: shooter.firstName,
        lastName: shooter.lastName,
        dateOfBirth: shooter.dateOfBirth,
        didEnterLastYear: shooter.didEnterLastYear,
        isRangeOfficer: shooter.isRangeOfficer,
        scoutGroup: shooter.scoutGroup,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            wrap="wrap"
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
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
                value={formik.values.scoutGroup}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
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
          >
            {actionButtonTitle}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
