import React from 'react';
import { ListItemText, Paper, Typography } from '@material-ui/core';
import { AssignedItem } from './AssignedItem';
import { StyledList as List, StyledListItem as ListItem } from './AssignedList.style';

const AssignedList = ({ tasksIds, tasksByIds, onTaskClick, onTaskDelete }) => {
  return (
    <Paper>
      <List>
        {tasksIds.length ? (
          tasksIds.map(id => (
            <AssignedItem
              key={id}
              task={tasksByIds[id]}
              onTaskDelete={onTaskDelete(tasksByIds[id].id)}
              onTaskClick={onTaskClick(tasksByIds[id].id)}
            />
          ))
        ) : (
          <ListItem>
            <ListItemText>
              <Typography align="center" variant="h5" color="textSecondary">
                No tasks were created
              </Typography>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export { AssignedList };
