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
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { SHOW_USERS_RESULTS } from '../../routes';

const AssignedItem = ({ task, onTaskDelete, onEditClick }) => {
  return (
    <Paper>
      <ListItem
        button
        component={Link}
        to={SHOW_USERS_RESULTS.replace(':id', task.id)}
        key={task.id}
        style={{ paddingTop: '1rem', width: '50vw' }}
      >
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
