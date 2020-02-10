import React from 'react';
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

function AddButton(props) {
    return (
        <Button variant="contained" color="secondary" onClick={props.onClick}>
            <AddIcon/>{props.children}
        </Button>
    );
} 

export default AddButton;
