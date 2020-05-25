import React, { useCallback, useMemo, useState } from 'react';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useStyles } from './styles';
import { AssignedList } from '../ListAssignedTasks/AssignedList';
import { Navbar } from '../Navbar';
import { TaskCreationModal } from '../TaskCreationModal';
import { filterExperts } from '../../helpers/tools';
import { SHOW_USERS_RESULTS } from '../../routes';

const MainPageAnalyst = ({
  user,
  usersIds,
  usersByIds,
  tasks,
  usersTasks,
  addTask,
  deleteTask,
  editTask,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const experts = useMemo(() => filterExperts(usersIds, usersByIds), [usersIds, usersByIds]);
  const userTasks = useMemo(() => usersTasks[user.id], [user, usersTasks]);

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
    editTask(task);
    setSelectedTask(undefined);
    handleCloseModal();
  };
  const handleTaskDelete = taskId => () => deleteTask(user.id, taskId);
  const handleTaskView = taskId => () => dispatch(push(SHOW_USERS_RESULTS.replace(':id', taskId)));
  const handleTaskEditClick = taskId => () => {
    setSelectedTask(taskId);
    handleOpenModal();
  };

  const getSelectedTask = useCallback(() => selectedTask && tasks[selectedTask], [tasks, selectedTask]);

  return (
    <>
      <Navbar />
      <AssignedList
        tasksIds={userTasks}
        tasksByIds={tasks}
        onTaskDelete={handleTaskDelete}
        onEditClick={handleTaskEditClick}
        onViewClick={handleTaskView}
      />
      <TaskCreationModal
        modalTitle="Создание задачи"
        open={modalState}
        experts={experts}
        usersByIds={usersByIds}
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
