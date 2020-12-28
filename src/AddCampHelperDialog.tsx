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
} from '@material-ui/core';
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="responsive-dialog-title">Add CampHelper</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            wrap="wrap"
          >
            <Grid item>
              <TextField
                id="firstName"
                label="First name"
                onChange={formik.handleChange}
                fullWidth
              >
                {formik.values.firstName}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                id="lastName"
                label="Last name"
                onChange={formik.handleChange}
                fullWidth
              >
                {formik.values.lastName}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                id="scoutAssociationId"
                label="Scout membership number (for DBS)"
                onChange={formik.handleChange}
                fullWidth
              >
                {formik.values.scoutAssociationId}
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
      </form>
    </Dialog>
  );
}

export default AddCampHelperDialog;
