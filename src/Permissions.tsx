import React from 'react';
import './Permissions.css';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Link, Typography } from '@material-ui/core';
import InfoDialog from './InfoDialog';

export default function Permissions() {
        
    const [state, setState] = React.useState({
        haveSection21Permission: false,
        havePorPermission: false,
        haveGdprPermission: false,
      });

    const handleChange = (name: string) => (event: { target: { checked: boolean; }; }) => {
        setState({ ...state, [name]: event.target.checked });
        };

    const { haveSection21Permission, havePorPermission, haveGdprPermission } = state;

    const preventDefault = (event: { preventDefault: () => any; }) => event.preventDefault();

    const section21InfoTitle = "Extract from Scouts UK Factsheet FS120004: Target Shooting";
    const section21InfoParagraphs = [
        "Section 21 of the 1968 Firearms Act prohibits the possession of a firearm and ammunition by any person who has been convicted of a crime and sentenced to a term of imprisonment or its equivalent for young persons of 3 months or more.",
        "The prohibition applies in all circumstances and to all categories of firearms and ammunition including those such as airguns or shot cartridges for which a certificate is not needed.",
        "A sentence of 3 months to 3 years attracts a 5 year prohibition, shorter ones no prohibition but a longer one means a life ban.",
        "Although not strictly a legal requirement, it is good practice to obtain a declaration that participants are not prohibited persons under Section 21 of the 1968 Firearms Act.",
        ];
        
    const section21InfoDialogRef = React.createRef<InfoDialog>();

    const handleSection21ClickOpen = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        section21InfoDialogRef.current?.showDialog();
    };

    const section21Label = (
        <Typography >
        { "All shooters are legally allowed to shoot under " }
            <Link href="#" onClick={handleSection21ClickOpen}>section 21</Link>.
        </Typography>);

    const porInfoTitle = "Extract from Scouts UK Factsheet FS120004: Target Shooting";
    const porInfoParagraphs = [
        "For those under the age of 18 years it is a requirement of POR that written parental consent is gained prior to the activity. Details of the particular form of shooting should be given with as much detail as practicable. This will help parents and the young people themselves to decide whether they consider the activity to be suitable for them. For some, the shooting of an air gun may be considered acceptable but not the shooting of a cartridge firearm. Others may consider the use of target rifles of all calibres acceptable but not air pistols. Such parental opinions must be respected.",
        ];
        
    const porInfoDialogRef = React.createRef<InfoDialog>();

    const handlePorClickOpen = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        porInfoDialogRef.current?.showDialog();
    };

    const porLabel = (
        <Typography >
        { "All under 18s are able to shoot and have permissions, as per " }
            <Link href="#" onClick={handlePorClickOpen}>POR</Link>.
        </Typography>);
    
    const gdprLabel = (
        <Typography >
        { "I agree to the " }
            <Link href="#" onClick={preventDefault}>GDPR policy</Link>.
        </Typography>);
        
    return (
        <>
            <Typography variant='h5'>Permissions</Typography>
        
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={haveSection21Permission} onChange={handleChange('haveSection21Permission')} value="haveSection21Permission" />}
                label= { section21Label }
              />
              <FormControlLabel
                control={<Checkbox  checked={havePorPermission} onChange={handleChange('havePorPermission')} value="havePorPermission" />}
                label= { porLabel }
              />
              <FormControlLabel
                control={<Checkbox  checked={haveGdprPermission} onChange={handleChange('haveGdprPermission')} value="haveGdprPermission" />}
                label= { gdprLabel }
              />
            </FormGroup>
          </FormControl>
          <InfoDialog title={ section21InfoTitle } paragraphs={ section21InfoParagraphs } ref={ section21InfoDialogRef }></InfoDialog>
          <InfoDialog title={ porInfoTitle } paragraphs={ porInfoParagraphs } ref={ porInfoDialogRef }></InfoDialog>
      </>
    );
}
