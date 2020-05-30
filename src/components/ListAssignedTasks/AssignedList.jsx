import React from 'react';
import { ListItemText, Paper, Typography } from '@material-ui/core';
import { AssignedItem } from './AssignedItem';
import { StyledList as List, StyledListItem as ListItem } from './AssignedList.style';

const AssignedList = ({ tasksIds, tasksByIds, onTaskDelete, onEditClick, onViewClick }) => {
  return (
    <Paper>
      <List>
        {tasksIds ? (
          tasksIds.map(id => (
            <AssignedItem
              key={id}
              task={tasksByIds[id]}
              onTaskDelete={onTaskDelete(id)}
              onEditClick={onEditClick(id)}
              onViewClick={onViewClick(id)}
            />
          ))
        ) : (
          <ListItem>
            <ListItemText>
              <Typography align="center" variant="h5" color="textSecondary">
                У вас еще нет проблем
              </Typography>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export { AssignedList };
