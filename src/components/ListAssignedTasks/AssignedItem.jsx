import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const AssignedItem = ({ task, onTaskDelete, onEditClick, onViewClick }) => {
  return (
    <Paper>
      <ListItem key={task.id} style={{ paddingTop: '1rem', width: '50vw' }}>
        <ListItemIcon>
          <IconButton edge="start" onClick={onEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton edge="start" onClick={onViewClick}>
            <VisibilityIcon />
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
