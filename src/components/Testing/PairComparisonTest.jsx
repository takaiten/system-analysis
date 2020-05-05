import React, { useCallback } from 'react';
import { Fab, ListItemText, Paper, Typography } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { diag } from 'mathjs';
import { useDispatch } from 'react-redux';
import { TestItem } from './TestItem';

import { useStyles } from '../MainPage/styles';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

import { completeTaskAction } from '../../redux/ducks/tasks/actions';

// const constructSquareMatrix = (n, value = 0) =>
//   Array(n)
//     .fill()
//     .map(() => Array(n).fill(value));

// const constructDiagonalMatrix = (n, value = 1) => {
//   const matrix = constructSquareMatrix(n);
//   for (let i = 0; i < matrix.length; i++) {
//     matrix[i][i] = value;
//   }
//   return matrix;
// };

const constructSquareMatrix = (n, value = 1) => Array(n).fill(value);

const constructDiagonalMatrix = n => {
  const X = constructSquareMatrix(n);
  return diag(X);
};

export const PairComparisonTest = ({ task, taskId, userId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // stores task answers like this : {[test number]: index of selected alternative }
  const taskAnswers = constructDiagonalMatrix(task.alternatives.length);

  const processAnswer = useCallback(
    (answerIndex, secondIndex, none = false) => {
      if (none) {
        taskAnswers[answerIndex][secondIndex] = 0.5;
        taskAnswers[secondIndex][answerIndex] = 0.5;
      } else {
        taskAnswers[answerIndex][secondIndex] = 1;
        taskAnswers[secondIndex][answerIndex] = 0;
      }
    },
    [taskAnswers],
  );
  const handleChange = useCallback(
    ({ target }) => {
      const [, answerIndex, secondIndex, flag] = target.value.match(/(\d+)-(\d+)([-|+])/);
      processAnswer(answerIndex, secondIndex, flag === '+');
    },
    [processAnswer],
  );

  // const comparisonCount = useMemo(() => combination(task.alternatives.length, 2), [task]);

  // const isSubmitDisabled = useMemo(() => comparisonCount !== numberPassed, [comparisonCount]);
  const isSubmitDisabled = useCallback(() => {
    const length = taskAnswers[0].length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        if (taskAnswers[i][j] + taskAnswers[j][i] === 0) return 1;
      }
    }
    return 0;
  }, [taskAnswers]);

  const handleTaskFinish = () => {
    dispatch(completeTaskAction(taskId, userId, taskAnswers));
  };

  const renderAlternatives = useCallback(() => {
    let index = 0;
    const { alternatives } = task;
    const length = alternatives.length;
    const result = [];
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        index++;
        result.push(
          <TestItem
            alternatives={alternatives}
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
  }, [task, handleChange]);

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
        disabled={isSubmitDisabled}
      >
        <CheckIcon className={classes.extendedIcon} />
        Submit!
      </Fab>
    </Paper>
  );
};
