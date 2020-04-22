import React from 'react';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';

import { red } from '@material-ui/core/colors';

const AssignedItem = ({ task, onTaskClick, onTaskDelete }) => {
  return (
    <Paper>
      <ListItem button onClick={onTaskClick}>
        <ListItemText>
          <Typography>{task.title}</Typography>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={onTaskDelete}>
            <DeleteIcon style={{ color: red[700] }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export { AssignedItem };
