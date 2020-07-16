import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class EmergencyContacts extends React.Component {
    render() {
        return (
            <HeadedSection title="Emergency Contacts">
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid key={"On-Site"} item>
                        <AddButton onClick={() => this.handleAddOnSiteContact()}>Add On-Site Emergency Contact</AddButton>
                    </Grid>
                    <Grid key={"Off-Site"} item>
                        <AddButton onClick={() => this.handleAddOffSiteContact()}>Add Off-Site Emergency Contact</AddButton>
                    </Grid>
                </Grid>
            </HeadedSection>
        );
    }

    handleAddOnSiteContact() {
    }

    handleAddOffSiteContact() {
    }

}

export default EmergencyContacts;
