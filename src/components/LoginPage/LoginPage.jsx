import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, push } from 'connected-react-router';

import { loginAction } from '../../redux/ducks/auth/actions';
import { getUsersByIds, getUsersIds } from '../../redux/ducks/auth/selectors';
import { MAIN } from '../../routes';
import { findUserByNickname, isValidInput } from '../../helpers/tools';
import { userNotFoundErrorMsg, wrongPasswordErrorMsg } from '../../helpers/consts';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    boxShadow: '0px 5px 24px 0px rgba(50, 50, 50, 0.5)',
    height: '50%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
    },
  },
  inputsContainer: {
    '&& > div': {
      padding: '10px',
    },
  },
  grid: {
    height: '100%',
  },
  formControl: {
    width: '100%',
  },
  title: {
    margin: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const usersByIds = useSelector(getUsersByIds);
  const usersIds = useSelector(getUsersIds);
  const classes = useStyles();

  const [fields, setFields] = useState({
    nickname: '',
    password: '',
  });

  const [fieldsErrors, setFieldsErrors] = useState({});

  const hideError = () => {
    setFieldsErrors({});
    return true;
  };

  const handleChange = ({ target: { name, value } }) =>
    isValidInput(value) &&
    hideError() &&
    setFields(prevState => ({
      ...prevState,
      [name]: value,
    }));

  const handleSubmit = () => {
    const userId = findUserByNickname(fields, usersByIds, usersIds);

    if (!userId) {
      return setFieldsErrors(prevState => ({ ...prevState, nickname: userNotFoundErrorMsg }));
    }
    const user = usersByIds[userId];
    if (user.password !== fields.password) {
      return setFieldsErrors(prevState => ({ ...prevState, password: wrongPasswordErrorMsg }));
    }

    dispatch(loginAction(user));
    dispatch(push(MAIN));
  };

  const handleCancel = () => dispatch(goBack());

  return (
    <div className={classes.root}>
      <Paper variant="outlined" elevated={5} className={classes.paper}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignContent="center"
          className={classes.grid}
        >
          <Grid>
            <Typography align="center" variant="h2" color="primary" className={classes.title}>
              Login
            </Typography>
            <Divider light variant="middle" />
          </Grid>
          <Grid container item direction="column" className={classes.inputsContainer}>
            <Grid item>
              <TextField
                fullWidth
                name="nickname"
                label="Username"
                error={!!fieldsErrors.nickname}
                helperText={fieldsErrors.nickname}
                value={fields.nickname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                error={!!fieldsErrors.password}
                helperText={fieldsErrors.password}
                value={fields.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Button fullWidth variant="contained" className={classes.button} onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

LoginPage.defaultProps = {
  manager: false,
  expert: false,
};

export { LoginPage };
