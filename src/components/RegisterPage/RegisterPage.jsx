import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { goBack, push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

import { MAIN } from '../../routes';
import { addUserAction } from '../../redux/ducks/auth/actions';
import { getUsersByIds, getUsersIds } from '../../redux/ducks/auth/selectors';
import { nameErrorMsg, nicknameTakenErrorMsg, passwordErrorMsg, roles } from '../../helpers/consts';
import { findUserByNickname, isValidInput, isValidName, isValidPassword } from '../../helpers/tools';

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
    height: '65%',
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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const usersByIds = useSelector(getUsersByIds);
  const usersIds = useSelector(getUsersIds);
  const classes = useStyles();

  const [fields, setFields] = useState({
    role: roles[0].label,
    firstName: '',
    lastName: '',
    nickname: '',
    password: '',
  });

  const [fieldsErrors, setFieldsErrors] = useState({});

  const handleChange = ({ target: { name, value } }) =>
    isValidInput(value) &&
    setFields(prevState => ({
      ...prevState,
      [name]: value,
    }));

  const validateFields = () => {
    const { firstName, lastName, nickname, password } = fields;
    const user = findUserByNickname({ nickname }, usersByIds, usersIds);

    const fieldsErrorsLocal = {
      firstName: !isValidName(firstName) && nameErrorMsg,
      lastName: !isValidName(lastName) && nameErrorMsg,
      nickname: user && nicknameTakenErrorMsg,
      password: !isValidPassword(password) && passwordErrorMsg,
    };
    setFieldsErrors(fieldsErrorsLocal);
    return Object.values(fieldsErrorsLocal).reduce((acc, item) => acc && !item, true);
  };

  const handleCancel = () => dispatch(goBack());

  const handleSubmit = () =>
    validateFields() &&
    dispatch(addUserAction({ ...fields, id: Math.round(new Date() / 1e3) })) &&
    dispatch(push(MAIN));

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
              Регистрация
            </Typography>
            <Divider light variant="middle" />
          </Grid>
          <Grid container item direction="column" className={classes.inputsContainer}>
            <Grid item container>
              <Grid item xs={12} lg={6}>
                <TextField
                  name="firstName"
                  label="Имя"
                  error={!!fieldsErrors.firstName}
                  helperText={fieldsErrors.firstName}
                  value={fields.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  name="lastName"
                  label="Фамилия"
                  error={!!fieldsErrors.lastName}
                  helperText={fieldsErrors.lastName}
                  value={fields.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                name="nickname"
                label="Имя пользователя"
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
                label="Пароль"
                type="password"
                error={!!fieldsErrors.password}
                helperText={fieldsErrors.password}
                value={fields.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="label">Роль</InputLabel>
                <Select name="role" labelId="label" value={fields.role} onChange={handleChange}>
                  {roles.map(role => (
                    <MenuItem value={role.label} key={role.id}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Button fullWidth variant="contained" className={classes.button} onClick={handleCancel}>
                Отмена
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
                Готово
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export { RegisterPage };
