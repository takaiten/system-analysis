import React, { useCallback, useMemo, useState } from 'react';
import { Fab, ListItemText, Paper, Typography } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import { TestItem } from './TestItem';

import { useStyles } from '../MainPage/styles';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

import { completeTaskAction } from '../../redux/ducks/tasks/actions';
import { flatIdentityMatrix } from '../../helpers/tools';
import { MAIN } from '../../routes';

export const PairComparisonTest = ({ task, taskId, userId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const size = useMemo(() => task.alternatives.length, [task]);
  const [taskAnswers, setTaskAnswers] = useState(flatIdentityMatrix(size));

  const processAnswer = useCallback(
    ({ answerIndex, secondIndex, none = false }) =>
      setTaskAnswers(prevState =>
        prevState
          .set(+answerIndex + size * +secondIndex, none ? 0.5 : 1)
          .set(+secondIndex + size * +answerIndex, none ? 0.5 : 0),
      ),
    [size],
  );

  const handleChange = useCallback(
    ({ target }) => {
      const [, answerIndex, secondIndex, flag] = target.value.match(/(\d+)-(\d+)([-|+])/);
      processAnswer({ answerIndex, secondIndex, none: flag === '+' });
    },
    [processAnswer],
  );

  const isSubmitDisabled = useCallback(() => {
    const matrix = taskAnswers.toJS();
    for (let i = 0; i < size - 1; i++) {
      for (let j = i + 1; j < size; j++) {
        if (matrix[i + size * j] + matrix[j + size * i] === 0) return true;
      }
    }
    return false;
  }, [taskAnswers, size]);

  const handleTaskFinish = () => {
    dispatch(push(MAIN));
    dispatch(completeTaskAction({ taskId, userId, result: { array: taskAnswers.toArray(), size } }));
  };

  const renderAlternatives = useCallback(() => {
    let index = 0;
    const result = [];
    for (let i = 0; i < size - 1; i++) {
      for (let j = i + 1; j < size; j++) {
        index++;
        result.push(
          <TestItem
            alternatives={task.alternatives}
            firstIndex={i}
            secondIndex={j}
            onChange={handleChange}
            testNumber={index}
            key={index}
          />,
        );
      }
    }
    return result;
  }, [task, size, handleChange]);

  return (
    <Paper>
      <List>
        {task && task.alternatives.length > 1 ? (
          renderAlternatives()
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
      <Fab
        variant="extended"
        size="large"
        color="secondary"
        className={classes.fab}
        onClick={handleTaskFinish}
        disabled={isSubmitDisabled()}
      >
        <CheckIcon className={classes.extendedIcon} />
        Submit!
      </Fab>
    </Paper>
  );
};
