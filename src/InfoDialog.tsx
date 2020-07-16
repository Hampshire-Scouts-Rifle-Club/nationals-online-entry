import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

type InfoDialogProps = {
    title: string;
    paragraphs: string[];
};

type InfoDialogState = {
    open: boolean;
};

class InfoDialog extends React.Component<InfoDialogProps, InfoDialogState> {
    constructor(props:InfoDialogProps) {
        super(props);
        this.state = {
            open: false
        };
        this.showDialog = this.showDialog.bind(this)
    }

    handleClose() {
        this.setState( {
            open: false
        });
    }
    
    showDialog= () => {
        this.setState( {
            open: true
        });
    }

    render() {
        return (<>
        <Dialog open={this.state.open} onClose={() => this.handleClose()}>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="subtitle2" paragraph={true}>{this.props.title}</Typography>
                    { // For convenience we use the index as the key. This would be bad if this were a dynamic list, but as it is static this is fine.
                    this.props.paragraphs.map((paragraph, i) => <Typography key={ i } paragraph={true}>{ paragraph }</Typography>) }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
        </>);
    }
}

export default InfoDialog;
