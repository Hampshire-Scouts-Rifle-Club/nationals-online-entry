import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function AddButton({
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

export default AddButton;
