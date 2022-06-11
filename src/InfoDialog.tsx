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
            <Typography key={hashCode(paragraph)} paragraph>
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
  );
}

function hashCode(text: string) {
  let hash = 0;
  let i;
  let chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i += 1) {
    chr = text.charCodeAt(i);
    hash = hash * 31 + chr;
    // hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
