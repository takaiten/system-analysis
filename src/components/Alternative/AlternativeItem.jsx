import React, { useState } from 'react';

import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core';

import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';

const AlternativeItem = ({ alternativeText, onAlternativeChange, onAlternativeDelete }) => {
  const [alternativeTitle, setAlternativeTitle] = useState(alternativeText);
  const [editState, setEditState] = useState(false);

  const handleEditStart = () => {
    setAlternativeTitle(alternativeText);
    setEditState(true);
  };

  const handleEditCancel = () => setEditState(false);

  const handleEditChange = ({ target }) => setAlternativeTitle(target.value);

  const handleEditSubmit = () => {
    onAlternativeChange(alternativeTitle);
    handleEditCancel();
  };

  return (
    <ListItem dense>
      <ListItemIcon>
        <IconButton edge="start">
          {editState ? <CloseIcon onClick={handleEditCancel} /> : <EditIcon onClick={handleEditStart} />}
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText>
        {editState ? (
          <Typography>{alternativeText}</Typography>
        ) : (
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Alternative"
            value={alternativeTitle}
            onChange={handleEditChange}
            onBlur={handleEditCancel}
          />
        )}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end">
          {editState ? (
            <CheckIcon onClick={handleEditSubmit} />
          ) : (
            <DeleteIcon onClick={onAlternativeDelete} />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { AlternativeItem };
