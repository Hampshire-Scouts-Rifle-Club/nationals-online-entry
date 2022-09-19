import React, { useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSignInOut } from './SignInSignOut';
import { readAllEntries } from './ServerState';
import {
  flattenAllEntriesToCsv,
  getTeamDetailsCsv,
} from './AllEntriesProcessing';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  email: {
    flexGrow: 0,
    marginRight: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const abortController = new AbortController();

function extractUserEmail(userData: any): string {
  const email =
    userData?.signInUserSession?.idToken?.payload?.email ?? 'email not found';

  return email;
}

type TopBarProps = {
  userData: any;
  resetHandler: () => void;
};

export function TopBar({ userData, resetHandler }: TopBarProps): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isScrolinInfoDialogOpen, setIsScrolinInfoDialogOpen] =
    React.useState(false);

  const { signInUrl, signOut } = getSignInOut();

  const [searchParams] = useSearchParams();
  const showDevControls = searchParams.get('dev') !== null;

  const titleBarText = showDevControls
    ? 'Competition Entry - DEV'
    : 'Competition Entry';

  const email = userData ? extractUserEmail(userData) : '';
  const isJohn = email === 'john.holcroft@montreux.co.uk';

  const downloadAllEntrantsCsv = useCallback(async () => {
    const allEntryRecords =
      (await readAllEntries(userData, abortController.signal)) ?? [];

    const allEntriesCsv = flattenAllEntriesToCsv(allEntryRecords);
    const allEntrantsUrl = window.URL.createObjectURL(
      new Blob([allEntriesCsv])
    );
    const allEntrantsLink = document.createElement('a');
    allEntrantsLink.download = 'AllEntrants.csv';
    allEntrantsLink.href = allEntrantsUrl;
    allEntrantsLink.click();

    const teamDetailsCsv = getTeamDetailsCsv(allEntryRecords);
    const teamDetailsUrl = window.URL.createObjectURL(
      new Blob([teamDetailsCsv])
    );
    const teamDetailsLink = document.createElement('a');
    teamDetailsLink.download = 'TeamDetails.csv';
    teamDetailsLink.href = teamDetailsUrl;
    teamDetailsLink.click();
  }, [userData]);

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const devMenuItems = [
    <MenuItem key="allEntrantCsv" onClick={downloadAllEntrantsCsv}>
      <ListItemIcon>
        <DownloadIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Download All Entrants</ListItemText>
    </MenuItem>,
    <MenuItem key="reset" onClick={() => resetHandler()}>
      Reset
    </MenuItem>,
    <Divider />,
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {titleBarText}
            </Typography>
            {userData && (
              <Button
                variant="text"
                color="inherit"
                // size="small"
                sx={{ textTransform: 'none' }}
                onClick={handleShowMenu}
                endIcon={<ExpandMoreIcon />}
              >
                {email}
              </Button>
            )}
            {!userData && (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className={classes.button}
                href={signInUrl}
              >
                Sign In
              </Button>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {isJohn && devMenuItems}
              <MenuItem
                key="signout"
                onClick={() => {
                  signOut();
                  handleCloseMenu();
                }}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Snackbar
        open={isScrolinInfoDialogOpen}
        autoHideDuration={3000}
        onClose={() => setIsScrolinInfoDialogOpen(false)}
        message="curl command copied to clipboard"
      />
    </div>
  );
}
