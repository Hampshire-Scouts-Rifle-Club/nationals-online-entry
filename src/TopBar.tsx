import React, { useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import { Container, Divider, Menu, MenuItem, Snackbar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSignInOut } from './SignInSignOut';

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
  const isScrolin =
    email === 'chris@scrolin.org.uk' ||
    email === 'john.holcroft@montreux.co.uk';

  const copyGetAllEntriesCommandToClipboard = useCallback(() => {
    const authToken = userData?.signInUserSession?.idToken?.jwtToken;
    const curlCommand = `curl -v https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/allEntries2/2022/submitted -H "Authorization: Bearer ${authToken}"`;
    navigator.clipboard.writeText(curlCommand);
    setIsScrolinInfoDialogOpen(true);
  }, [userData]);

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const scrolinMenuItems = [
    <MenuItem key="scrolin" onClick={copyGetAllEntriesCommandToClipboard}>
      Scrolin
    </MenuItem>,
    <Divider />,
  ];

  const devMenuItems = [
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
              {showDevControls && devMenuItems}
              {isScrolin && scrolinMenuItems}
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
