import React from 'react';
import { ListItemText, Paper, Typography } from '@material-ui/core';
import { TestItem } from './TestItem';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

export const TestList = ({ task }) => {
  return (
    <Paper>
      <List>
        {task && task.alternatives.length > 1 ? (
          task.alternatives.map(firstAlter =>
            task.alternatives.map(secondAlter => (
              <TestItem firstAlter={firstAlter} secondAlter={secondAlter} />
            )),
          )
        ) : (
          <ListItem>
            <ListItemText>
              <Typography align="center" variant="h5" color="textSecondary">
                No alternatives were created
              </Typography>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Paper>
  );
};
