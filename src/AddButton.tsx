import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function AddButton({
  children,
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={(event) => onClick(event)}
      style={{ margin: 1 }}
    >
      <AddIcon />
      {children}
    </Button>
  );
}
