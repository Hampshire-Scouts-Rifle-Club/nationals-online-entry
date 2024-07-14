import React, { useCallback, useRef, useState } from "react";
import {
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Stack,
  Divider,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormikErrors, useFormik } from "formik";
import { DatePicker } from "@mui//x-date-pickers";
import { EmptyShooter, Shooter } from "./Shooter";
import { ConfirmDialog } from "./ConfirmDialog";
import { calculateAge } from "./AgeUtils";
import { CompetitionDate } from "./CompetitionConstants";

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
      scoutGroup: shooter.scoutGroup,
    },
    onSubmit: (values) => {
      const newShooter: Shooter = {
        id: `${values.firstName.trim()}-${values.lastName.trim()}-${values.scoutGroup.trim()}`,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        dateOfBirth: values.dateOfBirth,
        isOver18:
          calculateAge(new Date(values.dateOfBirth), CompetitionDate) >= 18,
        scoutGroup: values.scoutGroup.trim(),
        county: "",
        previousCompetitorNumber: "",
        isRangeOfficer: false,
        rangeOfficerProofUrl: "",
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
        values.scoutGroup
      );

      const hasFirstName = values.firstName.trim().length > 0;
      const hasLastName = values.lastName.trim().length > 0;
      const hasScoutGroup = values.scoutGroup.trim().length > 0;

      if (!hasFirstName) {
        errors.firstName = "Required";
      }
      if (!hasLastName) {
        errors.lastName = "Required";
      }
      if (!hasScoutGroup) {
        errors.scoutGroup = "Required";
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const ageOnCompetitionDate = calculateAge(
    new Date(formik.values.dateOfBirth),
    CompetitionDate
  );
  const isOver18 = ageOnCompetitionDate >= 18;
  const is14to18 = ageOnCompetitionDate >= 14 && ageOnCompetitionDate < 18;
  const under14 = ageOnCompetitionDate < 14;

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
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  gap: "1rem",
                }}
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
              </div>
              <Grid item>
                <TextField
                  id="scoutGroup"
                  label="Scout group"
                  value={formik.values.scoutGroup}
                  onChange={formik.handleChange}
                />
              </Grid>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DatePicker
                  className="date-of-birth"
                  disableFuture
                  label="Date of birth"
                  views={["year", "month", "day"]}
                  value={
                    formik.values.dateOfBirth
                      ? new Date(formik.values.dateOfBirth)
                      : null
                  }
                  onChange={(date) => {
                    formik.setFieldValue("dateOfBirth", date);
                  }}
                />
              </LocalizationProvider>
              <div>
                <Typography variant="subtitle1">
                  <strong>Age Class</strong>
                </Typography>
                <Divider />
              </div>
              <Typography variant="body1">
                {isOver18 && "Over 18"}
                {is14to18 && "14 to 18"}
                {under14 && "Under 14"} on{" "}
                {new Date(CompetitionDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            {showDelete && (
              <IconButton
                color="primary"
                onClick={() => setIsDeleteConfirmationDialogOpen(true)}
                size="large"
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
