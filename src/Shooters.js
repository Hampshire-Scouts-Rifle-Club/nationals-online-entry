import React from 'react';
import './Shooters.css';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from "aws-amplify-react";
import * as queries from './graphql/queries';

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
        const ListView = ({ shooters }) => (
            <div>
                <ul>
                    {shooters.map(shooter => <li key={shooter.id}>{shooter.firstName} {shooter.surname}</li>)}
                </ul>
            </div>
        );
        
        return(
            <>
            <HeadedSection title="Shooters">
                <Connect query={graphqlOperation(queries.listShooters)}>
                {({ data: { items }, loading, errors }) => {
                    if (errors) {
                    console.log(errors);
                      return (<h3>Error</h3>);
                    }
                    if (loading || !items) return (<h3>Loading...</h3>);
                    return (<ListView shooters={items} /> );
                }}
                </Connect>
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