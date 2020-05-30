import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListItemText, Paper, Typography } from '@material-ui/core';
import { ResultModal } from './ResultModal';
import { getUsersByIds } from '../../redux/ducks/auth/selectors';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

import { getFullName } from '../../helpers/tools';

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
    handleOpenModal();
  };

  return (
    <>
      <ResultModal
        modalTitle={`${task.method}, результат:`}
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
                <ListItem button onClick={handleUserOpenModal(expertId)} style={{ width: '50vw' }}>
                  <ListItemText primary={getFullName(usersByIds[expertId])} />
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText>
                <Typography align="center" variant="h5" color="textSecondary">
                  Для этой проблемы не было назначенно экспертов
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </Paper>
      </List>
    </>
  );
};
