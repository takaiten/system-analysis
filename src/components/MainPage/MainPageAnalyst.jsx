import React, { useCallback, useState } from 'react';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AssignedList } from '../ListAssignedTasks/AssignedList';
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

const MainPageAnalyst = ({ user, tasks, addTask, deleteTask, editTask }) => {
  const classes = useStyles();

  const [modalState, setModalState] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);

  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);
  const handleCreateClick = () => {
    setModalState(true);
    setSelectedTask(undefined);
  };

  const handleTaskCreate = task => {
    addTask({ ...task, id: Math.round(new Date() / 1e3) }, user.id);
    setSelectedTask(undefined);
    handleCloseModal();
  };
  const handleTaskEdit = task => {
    editTask(task, user.id);
    setSelectedTask(undefined);
    handleCloseModal();
  };
  const handleTaskDelete = taskId => () => deleteTask(user.id, taskId);
  const handleTaskClick = taskId => () => {
    setSelectedTask(taskId);
    handleOpenModal();
  };

  const getSelectedTask = useCallback(() => selectedTask && tasks[user.id][selectedTask], [
    tasks,
    user,
    selectedTask
  ]);

  return (
    <>
      <Navbar />
      <AssignedList tasks={tasks[user.id]} onTaskDelete={handleTaskDelete} onTaskClick={handleTaskClick} />
      <TaskCreationModal
        modalTitle="Task creation"
        open={modalState}
        task={getSelectedTask()}
        onClose={handleCloseModal}
        onCreate={handleTaskCreate}
        onEdit={handleTaskEdit}
      />
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleCreateClick}
      >
        <Add className={classes.extendedIcon} />
        Create task
      </Fab>
    </>
  );
};

export { MainPageAnalyst };
