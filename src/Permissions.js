import React from 'react';
import './Permissions.css';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Link, Typography } from '@material-ui/core';

class Permissions extends React.Component {
        
    render() {
        const preventDefault = event => event.preventDefault();

        const section21Label = (
            <Typography >
            { "All shooters are legally allowed to shoot under " }
                <Link href="#" onClick={preventDefault}>section 21</Link>.
            </Typography>);

        const porLabel = (
            <Typography >
            { "All under 18s are able to shoot and have permissions, as per " }
                <Link href="#" onClick={preventDefault}>POR</Link>.
            </Typography>);

        const gdprLabel = (
            <Typography >
            { "I agree to the " }
                <Link href="#" onClick={preventDefault}>GDPR policy</Link>.
            </Typography>);

        return (
            <>
                <Typography variant='h5'>Permissions</Typography>
            
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={false} value="section21" />}
            label= { section21Label }
          />
          <FormControlLabel
            control={<Checkbox checked={false} value="POR" />}
            label= { porLabel }
          />
          <FormControlLabel
            control={<Checkbox checked={false} value="GDPR" />}
            label= { gdprLabel }
          />
        </FormGroup>
      </FormControl>
      </>
        );
    }
}

export default Permissions;
