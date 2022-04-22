import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useState, useCallback, ChangeEvent } from 'react';

interface InjectAuthenticatedUserDialogProps {
  open: boolean;
  handleClose: () => void;
  setUserData: (userData: any) => void;
}
export function InjectAuthenticatedUserDialog({
  open,
  handleClose,
  setUserData,
}: InjectAuthenticatedUserDialogProps) {
  const [workingText, setWorkingText] = useState('');

  const submitData = useCallback(() => {
    const data = JSON.parse(workingText);
    setUserData(data);
  }, [setUserData, workingText]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form
        onSubmit={submitData}
        onReset={() => {
          setWorkingText('');
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          Inject Authenticated User Data
        </DialogTitle>
        <DialogContent>
          <TextField
            id="authUserData"
            label="Authenticated User Data"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setWorkingText(event.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              // submitData();
              handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
