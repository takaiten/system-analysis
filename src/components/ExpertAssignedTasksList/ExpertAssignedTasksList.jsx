import React from 'react';
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VIEW_TASK } from '../../routes';
import { getUserCompletedTasks } from '../../redux/ducks/tasks/selectors';

const ExpertAssignedTasksList = ({ userTasksIds, tasksByIds }) => {
  const userCompletedTasks = useSelector(getUserCompletedTasks);
  return (
    <Paper elevation={5}>
      <List>
        <ListSubheader>
          <Typography variant="h4" align="center">
            Список задач
          </Typography>
        </ListSubheader>
        {userTasksIds ? (
          userTasksIds.map(taskId => {
            const task = tasksByIds[taskId];
            const completed = userCompletedTasks.includes(taskId);
            return (
              <>
                <ListItem
                  button={!completed}
                  component={completed ? ListItem : Link}
                  to={VIEW_TASK.replace(':id', taskId)}
                  key={taskId}
                >
                  <ListItemText primary={task.title} />
                  {completed && <Chip icon={<CheckIcon />} label="Completed!" color="secondary" />}
                </ListItem>
                <Divider />
              </>
            );
          })
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

export { ExpertAssignedTasksList };
