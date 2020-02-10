import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class InfoDialog extends React.Component {
    constructor(props) {
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
                    <Typography variant="subtitle2" paragraph="true">{this.props.title}</Typography>
                    { this.props.paragraphs.map(paragraph => <Typography paragraph="true">{ paragraph }</Typography>) }
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
