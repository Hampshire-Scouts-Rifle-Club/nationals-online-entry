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
                    <Grid key={"1"} item>
                        <AddButton>Add On-Site Emergency Contact</AddButton>
                    </Grid>
                    <Grid key={"2"} item>
                        <AddButton>Add Off-Site Emergency Contact</AddButton>
                    </Grid>
                </Grid>
            </HeadedSection>
        );
    }
}

export default EmergencyContacts;
