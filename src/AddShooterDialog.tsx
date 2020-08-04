import React from 'react';
import { Grid, TextField, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

type ShooterType = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    scoutGroup: string;
    county: string;
    didEnterLastYear: boolean;
    isRangeOffice: boolean;
    rangeOfficerProofUrl: string;
}

export const EmptyShooter: ShooterType = {
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    scoutGroup: "",
    county: "",
    didEnterLastYear: false,
    isRangeOffice: false,
    rangeOfficerProofUrl: "",
}

type ShootingEventType = {
    title: string;
    slots: number;
    cost: number;
    description: string;
}

type ShooterPropsType = {
    open: boolean;
    handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    shooter: ShooterType;
    eventsEntered: ShootingEventType[];
    allScoutGroups: string[];
    allEvents: ShootingEventType[];
}

export function AddShooterDialog({ open, handleClose, shooter }: ShooterPropsType) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
        null,
    );
    const [firstName, setFirstName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Add Shooter"}</DialogTitle>
            <DialogContent>
                <Grid container justify="space-around">
                    <TextField id="first-name" label="First name" onChange={(event) => setFirstName(event.target.value)} >{firstName}</TextField>
                    <TextField id="last-name" label="Surname" onChange={(event) => setSurname(event.target.value)} >{surname}</TextField>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableFuture
                        variant="inline"
                        format="dd/MM/yyyy"
                        label="Date of birth"
                        views={["year", "month", "date"]}
                        value={dateOfBirth}
                        onChange={date => setDateOfBirth(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {"Cancel"}
                </Button>
                <Button onClick={handleClose} color="primary" disabled>
                    {"Save"}
                </Button>
            </DialogActions>
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
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        scoutGroup: "",
        county: "",
        didEnterLastYear: false,
        isRangeOffice: false,
        rangeOfficerProofUrl: "",
    },
    eventsEntered: [],
    allScoutGroups: [],
    allEvents: [],
}

export default AddShooterDialog;