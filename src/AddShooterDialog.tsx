/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  TextField, useTheme, useMediaQuery,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useFormik, useField, useFormikContext } from 'formik';
import DatePickerField from './DatePicker';
import { Shooter } from './useShootersList';

export const EmptyShooter: Shooter = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  scoutGroup: '',
  county: '',
  didEnterLastYear: false,
  isRangeOffice: false,
  rangeOfficerProofUrl: '',
};

type ShootingEventType = {
    title: string;
    slots: number;
    cost: number;
    description: string;
}

type ShooterPropsType = {
    open: boolean;
    handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    shooter: Shooter;
    eventsEntered: ShootingEventType[];
    allScoutGroups: string[];
    allEvents: ShootingEventType[];
}

export function AddShooterDialog({ open, handleClose, shooter }: ShooterPropsType) {
  const formik = useFormik({
    initialValues: {
      firstName: shooter.firstName,
      lastName: shooter.lastName,
      dateOfBirth: shooter.dateOfBirth,
      didEnterLastYear: shooter.didEnterLastYear,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
  //     null,
  // );
  // const [firstName, setFirstName] = React.useState("")
  // const [surname, setSurname] = React.useState("")

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

          <TextField id="firstName" label="First name" onChange={formik.handleChange}>{formik.values.firstName}</TextField>
          <TextField id="lastName" label="Last name" onChange={formik.handleChange}>{formik.values.lastName}</TextField>
          {/* <DatePickerField name="dateOfBirth" value={formik.values.dateOfBirth} /> */}
          <FormControlLabel control={<Checkbox name="didEnterLastYear" value={formik.values.didEnterLastYear} onChange={formik.handleChange} />} label="Entered last year" />
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
  // Text field for first name

  // Text field for last time. CSS will say whether it is beside or below first name based on screen size

  // Link to explanation for why we need date of birth from everyone

  // Entered last year check box

  // Events block
}

AddShooterDialog.defaultProps = {
  open: false,
  handleClose: () => { },
  shooter: {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    scoutGroup: '',
    county: '',
    didEnterLastYear: false,
    isRangeOffice: false,
    rangeOfficerProofUrl: '',
  },
  eventsEntered: [],
  allScoutGroups: [],
  allEvents: [],
};

export default AddShooterDialog;
