import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

type InfoDialogProps = {
  title: string;
  paragraphs: string[];
  isOpen: boolean;
  handleClose: () => void;
};

export function InfoDialog({
  title,
  paragraphs,
  isOpen,
  handleClose,
}: InfoDialogProps): JSX.Element {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {paragraphs.map((paragraph) => (
            <Typography paragraph>{paragraph}</Typography>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
