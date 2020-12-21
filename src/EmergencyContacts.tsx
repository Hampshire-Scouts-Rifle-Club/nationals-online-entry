import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

function EmergencyContacts(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleAddOnSiteContact() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleAddOffSiteContact() {}

  return (
    <HeadedSection title="Emergency Contacts">
      <Grid container direction="column" alignItems="flex-start" spacing={1}>
        <Grid key="On-Site" item>
          <AddButton onClick={() => handleAddOnSiteContact()}>
            Add On-Site Emergency Contact
          </AddButton>
        </Grid>
        <Grid key="Off-Site" item>
          <AddButton onClick={() => handleAddOffSiteContact()}>
            Add Off-Site Emergency Contact
          </AddButton>
        </Grid>
      </Grid>
    </HeadedSection>
  );
}

export default EmergencyContacts;
