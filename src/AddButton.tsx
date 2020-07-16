import React from 'react';
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

function AddButton(props: { onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void); children: React.ReactNode; }) {
    return (
        <Button variant="contained" color="secondary" onClick={(event) => props.onClick(event)} style={{margin: 1}} >
            <AddIcon/>{props.children}
        </Button>
    );
} 

export default AddButton;
