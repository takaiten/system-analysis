import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { VIEW_TASK } from '../../routes';

const ExpertAssignedTasksList = ({ userTasksIds, tasksByIds }) => {
  return (
    <Paper>
      <List>
        {userTasksIds.map(taskId => {
          const task = tasksByIds[taskId];
          return (
            <ListItem button component={Link} to={VIEW_TASK.replace(':id', taskId)} key={taskId}>
              <ListItemText primary={task.title} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export { ExpertAssignedTasksList };
