import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

type InfoDialogProps = {
  title: string;
  paragraphs: string[];
  isOpen: boolean;
  handleClose: () => void;
};

function InfoDialog({
  title,
  paragraphs,
  isOpen,
  handleClose,
}: InfoDialogProps): JSX.Element {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        {/* <DialogTitle>{title}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            {paragraphs.map((paragraph) => (
              <Typography key={paragraph} paragraph>
                {paragraph}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoDialog;
