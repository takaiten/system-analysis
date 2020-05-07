import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { StyledList as List } from './ResultModal.style';
import { getCompleteTasks } from '../../redux/ducks/tasks/selectors';

const ResultModal = ({ open, modalTitle, onClose, onForceClose, task, userId }) => {
  const CompleteTasks = useSelector(getCompleteTasks);

  return (
    <Dialog open={open} onClose={onForceClose} maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <List>
          <Paper>
            {CompleteTasks[userId] && CompleteTasks[userId][task.id] ? (
              CompleteTasks[userId][task.id].order.map((alternativeIndex, justIndex) => {
                return (
                  <ListItem style={{ paddingTop: '1rem', width: '50vw' }}>
                    <ListItemText primary={`${justIndex + 1}. ${task.alternatives[alternativeIndex]}`} />
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText>
                  <Typography align="center" variant="h5" color="textSecondary">
                    Task not completed
                  </Typography>
                </ListItemText>
              </ListItem>
            )}
          </Paper>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ResultModal };
