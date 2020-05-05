import React from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

import { StyledListItem as ListItem } from './AssignedList.style';

const AssignedItem = ({ task, onTaskClick, onTaskDelete, onEditClick }) => {
  return (
    <Paper>
      <ListItem button onClick={onTaskClick}>
        <ListItemIcon>
          <IconButton edge="start" onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        </ListItemIcon>
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
