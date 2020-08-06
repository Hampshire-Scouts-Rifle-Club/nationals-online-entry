/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useField } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// type DatePickerProps = {
//     name: string,
//     value: Date,
// };

const DatePickerField = ({ ...props }) => {
  const [field, , { setValue }] = useField(props);
  //   const { value } = meta;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableFuture
        variant="inline"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={['year', 'month', 'date']}
        value={field.value && new Date(field.value)}
        onChange={(date) => { setValue(date); }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
