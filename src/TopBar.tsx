import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';

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
  const email =
    userData?.signInUserSession?.idToken?.payload?.email ?? 'email not found';

  return email;
}

type TopBarProps = {
  userData: any;
  handleSignOut: () => void;
  resetHandler: () => void;
};

export function TopBar({
  userData,
  handleSignOut,
  resetHandler,
}: TopBarProps): JSX.Element {
  const classes = useStyles();

  const redirectUri = isDev()
    ? 'http%3A%2F%2Flocalhost%3A3000'
    : 'https%3A%2F%2Fentry.nationalscoutriflechampionships.org.uk';
  const clientId = isDev()
    ? '5ofjg01kui3ue7a137qicdtgri'
    : '5vl121hntrlpc8veeo43so2m7q';
  const loginUrl = `https://auth.nationalscoutriflechampionships.org.uk/oauth2/authorize?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;

  const [searchParams] = useSearchParams();
  const showDevControls = searchParams.get('dev') !== null;

  const titleBarText = showDevControls ? 'Team Entry - DEV' : 'Team Entry';

  const email = userData ? extractUserEmail(userData) : '';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {titleBarText}
          </Typography>
          <div className={classes.grow} />
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
