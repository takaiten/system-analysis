import React, { useCallback, useMemo, useState } from 'react';

import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

import { green, red } from '@material-ui/core/colors';

const AlternativeItem = ({ canEdit, alternativeText, onAlternativeChange, onAlternativeDelete }) => {
  const [alternativeTitle, setAlternativeTitle] = useState(alternativeText);
  const [editState, setEditState] = useState(false);

  const handleEditStart = useCallback(() => {
    setAlternativeTitle(alternativeText);
    setEditState(true);
  }, [setAlternativeTitle, alternativeText]);

  const handleEditCancel = useCallback(() => setEditState(false), []);

  const handleEditChange = useCallback(({ target }) => setAlternativeTitle(target.value), []);

  const handleEditSubmit = useCallback(() => {
    if (alternativeTitle.length === 0) {
      return;
    }
    onAlternativeChange(alternativeTitle);
    handleEditCancel();
  }, [onAlternativeChange, alternativeTitle, handleEditCancel]);

  const handleKeyPress = useCallback(event => event.charCode === 13 && handleEditSubmit(), [
    handleEditSubmit,
  ]);

  const firstListButton = useMemo(
    () => (
      <>
        {canEdit && (
          <ListItemIcon>
            <IconButton edge="start" onClick={editState ? handleEditCancel : handleEditStart}>
              {editState ? <CloseIcon style={{ color: red[500] }} /> : <EditIcon />}
            </IconButton>
          </ListItemIcon>
        )}
      </>
    ),
    [canEdit, editState, handleEditCancel, handleEditStart],
  );

  const secondListButton = useMemo(
    () => (
      <>
        {canEdit && (
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={editState ? handleEditSubmit : onAlternativeDelete}>
              {editState ? (
                <CheckIcon style={{ color: green[500] }} />
              ) : (
                <DeleteIcon style={{ color: red[700] }} />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </>
    ),
    [canEdit, editState, handleEditSubmit, onAlternativeDelete],
  );

  return (
    <Paper>
      <ListItem dense>
        {firstListButton}
        <ListItemText>
          {editState ? (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              label="Alternative"
              value={alternativeTitle}
              onChange={handleEditChange}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <Typography>{alternativeText}</Typography>
          )}
        </ListItemText>
        {secondListButton}
      </ListItem>
    </Paper>
  );
};

export { AlternativeItem };
