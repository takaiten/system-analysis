import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../redux/ducks/auth/selectors';
import { logoutAction } from '../../redux/ducks/auth/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { firstName, lastName, role } = useSelector(getUser);

  const handleLogout = () => dispatch(logoutAction());

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {`Welcome, ${firstName} ${lastName} (${role})`}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            className={classes.menuButton}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Navbar };
