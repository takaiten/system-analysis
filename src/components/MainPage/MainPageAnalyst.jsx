import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/ducks/auth/selectors';
import { addTaskAction } from '../../redux/ducks/tasks/actions';

import { Navbar } from '../Navbar';
import { TaskCreationModal } from '../TaskCreationModal';

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
  const users = useSelector(getUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);
  const handleTaskCreate = task =>
    dispatch(addTaskAction({ ...task, id: Math.round(new Date() / 1e3) }, users.id));

  return (
    <>
      <Navbar />
      <TaskCreationModal
        modalTitle="Task creation"
        open={modalState}
        onClose={handleCloseModal}
        onCreate={handleTaskCreate}
      />
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleOpenModal}
      >
        <Add className={classes.extendedIcon} />
        Create task
      </Fab>
      <h1>Main Page analyst</h1>
    </>
  );
};

export { MainPageAnalyst };
