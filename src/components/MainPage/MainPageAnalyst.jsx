import React from 'react';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { Navbar } from '../Navbar';
import { CREATE_TASK } from '../../routes';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(2)
  }
}));

const MainPageAnalyst = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleTaskCreation = () => dispatch(push(CREATE_TASK));

  return (
    <>
      <Navbar />
      <div>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleTaskCreation}
        >
          <Add className={classes.extendedIcon} />
          Create task
        </Fab>
      </div>
      <h1>Main Page analyst</h1>
    </>
  );
};

export { MainPageAnalyst };
