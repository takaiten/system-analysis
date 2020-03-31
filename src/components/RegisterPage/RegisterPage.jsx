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
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { goBack } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addUserAction } from '../../redux/ducks/auth/actions';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%'
    }
  },
  grid: {
    '& > div': {
      paddingBottom: theme.spacing(2)
    },
    '& > div:first-of-type': {
      paddingTop: theme.spacing(2)
    }
  },
  formControl: {
    width: '100%'
  },
  title: {
    margin: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(1)
  }
}));

// TODO: To helpers
const isValidName = name => name && name.length > 1;
const isValidPassword = password => password && password.length > 4;

// TODO: To const
const NAME_ERROR_MSG = 'Must contain at least 2 characters';
const PSWD_ERROR_MSG = 'Must contain at least 5 characters';

const ROLES = [
  {
    id: 1,
    label: 'Expert'
  },
  {
    id: 2,
    label: 'Analyst'
  }
];

const RegisterPage = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [fields, setFields] = useState({
    role: 'Expert',
    firstName: '',
    lastName: '',
    nickname: '',
    password: ''
  });

  const [fieldsErrors, setFieldsErrors] = useState({});

  const handleChange = ({ target: { name, value } }) =>
    /^[\w ]*$/.test(value) &&
    setFields(prevState => ({
      ...prevState,
      [name]: value
    }));

  const validateFields = () => {
    const { firstName, lastName, nickname, password } = fields;
    const fieldsErrorsLocal = {
      firstName: !isValidName(firstName) && NAME_ERROR_MSG,
      lastName: !isValidName(lastName) && NAME_ERROR_MSG,
      nickname: !isValidName(nickname) && NAME_ERROR_MSG, // TODO: Test if nickname already in base
      password: !isValidPassword(password) && PSWD_ERROR_MSG
    };
    setFieldsErrors(fieldsErrorsLocal);
    return Object.values(fieldsErrorsLocal).reduce((acc, item) => acc && !item, true);
  };

  const handleCancel = () => dispatch(goBack());

  const handleSubmit = () => validateFields() && dispatch(addUserAction(fields));

  return (
    <Paper variant="outlined" elevated={5} className={classes.root}>
      <Typography align="center" variant="h2" color="primary" className={classes.title}>
        Register
      </Typography>
      <Divider light variant="middle" />
      <Grid container direction="column" alignContent="center" className={classes.grid}>
        <Grid item>
          <TextField
            name="firstName"
            label="First Name"
            error={!!fieldsErrors.firstName}
            helperText={fieldsErrors.firstName}
            value={fields.firstName}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name"
            error={!!fieldsErrors.lastName}
            helperText={fieldsErrors.lastName}
            value={fields.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            name="nickname"
            label="Nickname"
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
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="label">Role</InputLabel>
            <Select name="role" labelId="label" value={fields.role} onChange={handleChange}>
              {ROLES.map(role => (
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
    </Paper>
  );
};

export { RegisterPage };
