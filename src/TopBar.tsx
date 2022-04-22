import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import { Auth } from 'aws-amplify';
import { useSearchParams } from 'react-router-dom';
import { InjectAuthenticatedUserDialog } from './InjectAuthenticatedUserDialog';
// import { LoggedInUser } from './LoggedInUser';

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
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

function extractUserEmail(userData: any): string {
  // Google email path: x.signInUserSession.idToken.payload.email
  // Cognito email path: x.signInUserSession.idToken.payload.email
  const email =
    userData?.signInUserSession?.idToken?.payload?.email ?? 'email not found';

  return email;
}

type TopBarProps = {
  userData: any;
  setUserData: (userData: any) => void;
  resetHandler: () => void;
  errorHandler: (error: any) => void;
};

export function TopBar({
  userData,
  setUserData,
  resetHandler,
  errorHandler,
}: TopBarProps): JSX.Element {
  const classes = useStyles();
  const [
    isInjectAuthenticatedUserDialogOpen,
    setIsInjectAuthenticatedUserDialogOpen,
  ] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      await Auth.signOut();
      setUserData(undefined);
    } catch (error) {
      errorHandler(error);
    }
  }, [errorHandler, setUserData]);

  const redirectUri = isDev()
    ? 'http%3A%2F%2Flocalhost%3A3000'
    : 'https%3A%2F%2Fentry.nationalscoutriflechampionships.org.uk';
  const loginUrl = `https://auth.nationalscoutriflechampionships.org.uk/oauth2/authorize?client_id=5vl121hntrlpc8veeo43so2m7q&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;

  const [searchParams] = useSearchParams();
  const showDevControls = searchParams.get('dev') !== null;

  const titleBarText = showDevControls ? 'Team Entry - DEV' : 'Team Entry';

  const email = userData ? extractUserEmail(userData) : '';

  return (
    <div className={classes.root}>
      <InjectAuthenticatedUserDialog
        open={isInjectAuthenticatedUserDialogOpen}
        handleClose={() => setIsInjectAuthenticatedUserDialogOpen(false)}
        setUserData={setUserData}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {titleBarText}
          </Typography>
          <div className={classes.grow} />
          {!userData && isDev() && (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              className={classes.button}
              onClick={() => setIsInjectAuthenticatedUserDialogOpen(true)}
            >
              Inject User
            </Button>
          )}
          {!userData && (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              className={classes.button}
              href={loginUrl}
            >
              Login
            </Button>
          )}
          {userData && showDevControls && (
            <Button
              color="inherit"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(userData))
              }
              // startIcon={<ContentCopyIcon />}
            >
              Copy User Data
            </Button>
          )}
          {userData && (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out (API)
            </Button>
          )}

          {showDevControls && (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => resetHandler()}
              className={classes.button}
            >
              Reset
            </Button>
          )}
          <Typography color="inherit">{email}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
