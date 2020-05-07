import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { ResultModal } from './ResultModal';
import { getUsersByIds } from '../../redux/ducks/auth/selectors';
import { StyledList as List } from '../ListAssignedTasks/AssignedList.style';
// import { getUserCompletedTasks } from '../../redux/ducks/tasks/selectors';
// import { Check as CheckIcon } from '@material-ui/icons';

export const UsersResults = ({ task }) => {
  const usersByIds = useSelector(getUsersByIds);
  const [modalState, setModalState] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => {
    setModalState(false);
    setSelectedUserId(0);
  };

  const handleUserOpenModal = userId => () => {
    setSelectedUserId(userId);
    console.log(selectedUserId);
    handleOpenModal();
  };

  return (
    <>
      <ResultModal
        modalTitle="Comparison's result "
        open={modalState}
        task={task}
        onClose={handleCloseModal}
        userId={selectedUserId}
      />
      <List>
        <Paper>
          {task.experts[0] ? (
            task.experts.map(expertId => {
              return (
                <ListItem
                  button
                  onClick={handleUserOpenModal(expertId)}
                  style={{ paddingTop: '1rem', width: '50vw' }}
                >
                  <ListItemText primary={usersByIds[expertId].nickname} />
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText>
                <Typography align="center" variant="h5" color="textSecondary">
                  No assigned experts
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </Paper>
      </List>
    </>
  );
};
