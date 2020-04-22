import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { AssignedItem } from './AssignedItem';

const AssignedList = ({ tasks, onTaskClick, onTaskDelete }) => {
  return (
    <Paper>
      <List style={{ height: '80vh', overflowY: 'auto' }}>
        {tasks ? (
          Object.keys(tasks).map(element => (
            <AssignedItem
              key={element}
              task={tasks[element]}
              onTaskDelete={onTaskDelete(tasks[element].id)}
              onTaskClick={onTaskClick(tasks[element].id)}
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
