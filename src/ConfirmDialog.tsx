import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}
export function ConfirmDialog({
  title,
  description,
  confirmText = "OK",
  open,
  handleClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            onConfirm();
          }}
          color="primary"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
