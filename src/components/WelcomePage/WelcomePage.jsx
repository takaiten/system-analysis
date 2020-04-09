import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LOGIN, REGISTER } from '../../routes';

const useStyles = makeStyles(() => ({
  grid: {
    height: '100vh'
  }
}));

const WelcomePage = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="space-evenly" alignContent="center" className={classes.grid}>
      <Grid container justify="center">
        <Typography color="textSecondary" variant="h2">
          Welcome
        </Typography>
      </Grid>
      <Grid container spacing={1} justify="center">
        <Grid container item justify="center">
          <Grid item xs={6} md={4} lg={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to={LOGIN}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid container item justify="center">
          <Grid item xs={6} md={4} lg={2}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to={REGISTER}
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <Grid container item justify="center">
          <Grid item xs={6} md={4} lg={2}>
            <Button
              fullWidth
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => localStorage.clear()}
            >
              [DEBUG] Clear Local Storage
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { WelcomePage };
