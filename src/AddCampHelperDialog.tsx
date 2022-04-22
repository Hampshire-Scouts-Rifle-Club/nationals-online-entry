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
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import { CampHelper } from './CampHelper';

type CampHelperPropsType = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  addCampHelper: (campHelper: CampHelper) => void;
  campHelper: CampHelper;
};

export function AddCampHelperDialog({
  open,
  handleClose,
  campHelper,
  addCampHelper,
}: CampHelperPropsType): JSX.Element {
  const formik = useFormik({
    initialValues: {
      firstName: campHelper.firstName,
      lastName: campHelper.lastName,
      scoutAssociationId: campHelper.scoutAssociationId,
    },
    onSubmit: (values) => {
      const newCampHelper: CampHelper = {
        firstName: values.firstName,
        lastName: values.lastName,
        scoutAssociationId: values.scoutAssociationId,
      };
      addCampHelper(newCampHelper);
    },
  });

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
        <DialogTitle id="responsive-dialog-title">Camp Helper</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            wrap="wrap"
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
            <Grid item>
              <TextField
                id="scoutAssociationId"
                label="Scout membership number (for DBS)"
                value={formik.values.scoutAssociationId}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddCampHelperDialog;
