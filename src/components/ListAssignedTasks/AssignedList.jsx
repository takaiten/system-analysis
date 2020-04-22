import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { AssignedItem } from './AssignedItem';

const AssignedList = ({ tasks, onTaskDelete }) => {
  return (
    <Paper>
      <List style={{ height: '70vh', overflowY: 'auto' }}>
        {Object.keys(tasks).length && tasks ? (
          // Object.keys(tasks).forEach(element => <AssignedItem task={tasks[element]} />)
          Object.keys(tasks).map(element => (
            <AssignedItem task={tasks[element]} onTaskDelete={onTaskDelete(tasks[element].id)} />
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
