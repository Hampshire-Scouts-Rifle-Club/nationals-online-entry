import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import { Container, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSignInOut } from './SignInSignOut';
import { signInWithRedirect } from 'aws-amplify/auth';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginBottom: theme.spacing(1),
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   email: {
//     flexGrow: 0,
//     marginRight: theme.spacing(1),
//   },
//   button: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
// }));

type TopBarProps = {
  email?: string;
  resetHandler: () => void;
};

export function TopBar({ email }: TopBarProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { signInUrl, signOut } = getSignInOut();

  const [searchParams] = useSearchParams();
  const showDevControls = searchParams.get('dev') !== null;

  const titleBarText = showDevControls
    ? 'Competition Entry - DEV'
    : 'Competition Entry';

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {titleBarText}
            </Typography>
            {email && (
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
            {!email && (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                // href={signInUrl}
                onClick={() => {
                  signInWithRedirect();
                }}
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
    </div>
  );
}
