import React from 'react';
import './Shooters.css';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class Shooters extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false
        };
    }

  handleClickOpen() {
    this.setState({ isDialogOpen: true });
  }

  handleClose() {
    this.setState({ isDialogOpen: false });
  }

    render() {
        return(
            <>
            <HeadedSection title="Shooters">
                <AddButton onClick={() => this.handleClickOpen()}>
                    Add Shooter
                </AddButton>
            </HeadedSection>
            
            <Dialog
                open={this.state.isDialogOpen}
                onClose={() => this.handleClose()}
              >
                <DialogTitle>{'Add Shooter pressed'}</DialogTitle>
                <DialogActions>
                  <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
            </Dialog>
      </>
            );
    }
}

export default Shooters;