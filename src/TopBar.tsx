import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
}));

export default function TopBar(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Team Entry
          </Typography>
          <div className={classes.grow} />
          <Typography variant="body1" className={classes.email}>
            joe.bloggs@email.com
          </Typography>
          <Button variant="outlined" size="small" color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
