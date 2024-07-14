import { useCallback, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { AddEmergencyContactDialog } from "./AddEmergencyContactDialog";
import { EmergencyContact } from "./EmergencyContact";

interface EmergencyContactFieldProps {
  emergencyContact: EmergencyContact;
  setEmergencyContact: (emergencyContact: EmergencyContact) => void;
  isReadOnly: boolean;
}

export function EmergencyContactField({
  emergencyContact,
  setEmergencyContact,
  isReadOnly,
}: EmergencyContactFieldProps): JSX.Element {
  const [isAddEmergencyContactDialogOpen, setIsAddEmergencyContactDialogOpen] =
    useState(false);

  const handleClose = useCallback(() => {
    setIsAddEmergencyContactDialogOpen(false);
  }, []);

  const hasEmergencyContact =
    emergencyContact.name.trim().length !== 0 &&
    emergencyContact.contactNumber.trim().length !== 0;

  if (isReadOnly) {
    return (
      <Box marginLeft="1rem" marginBottom="0.5rem">
        <Typography variant="body2" style={{ display: "inline", flex: 1 }}>
          {`${emergencyContact.name} ${emergencyContact.contactNumber}`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box marginLeft="1rem">
      <div style={{ display: hasEmergencyContact ? "" : "none" }}>
        <Stack direction="row">
          <Typography variant="body2" style={{ display: "inline", flex: 1 }}>
            {`${emergencyContact.name} ${emergencyContact.contactNumber}`}
          </Typography>
          <Button
            size="small"
            color="secondary"
            startIcon={<EditIcon />}
            style={{ marginLeft: "1rem" }}
            onClick={() => setIsAddEmergencyContactDialogOpen(true)}
          >
            Edit
          </Button>
        </Stack>
      </div>
      <div style={{ display: hasEmergencyContact ? "none" : "" }}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddEmergencyContactDialogOpen(true)}
        >
          Add
        </Button>
      </div>
      <AddEmergencyContactDialog
        open={isAddEmergencyContactDialogOpen}
        emergencyContact={emergencyContact}
        handleClose={handleClose}
        addEmergencyContact={setEmergencyContact}
      />
    </Box>
  );
}
