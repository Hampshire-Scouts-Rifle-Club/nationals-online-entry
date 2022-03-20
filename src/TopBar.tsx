import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

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

type TopBarProps = {
  resetHandler: () => void;
};

export default function TopBar({ resetHandler }: TopBarProps): JSX.Element {
  const classes = useStyles();

  const [user, setUser] = React.useState<CognitoUser | undefined>();
  React.useEffect(() => {
    (async () => {
      try {
        setUser(await Auth.currentAuthenticatedUser());
      } catch (e) {
        setUser(undefined);
      }
    })();
  });

  return (
    <div className={classes.root}>
      <pre>{user ? JSON.stringify(user, null, 2) : 'No authenicated user'}</pre>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Team Entry
          </Typography>
          <div className={classes.grow} />
          <Typography variant="body1" className={classes.email}>
            hello
          </Typography>
          <Button variant="outlined" size="small" color="inherit">
            Sign Out
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => resetHandler()}
            className={classes.button}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
