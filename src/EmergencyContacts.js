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
                  justify="space-between"
                  alignItems="flex-start"
                >
                    <AddButton>Add On-Site Emergency Contact</AddButton>
                    <AddButton>Add Off-Site Emergency Contact</AddButton>
                </Grid>
            </HeadedSection>
        );
    }
}

export default EmergencyContacts;
