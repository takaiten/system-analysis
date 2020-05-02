import React, { useCallback, useMemo } from 'react';
import { Fab, ListItemText, Paper, Typography } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { TestItem } from './TestItem';

import { useStyles } from '../MainPage/styles';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

import { combination } from '../../helpers/tools';

const constructSquareMatrix = (n, value = 0) =>
  Array(n)
    .fill()
    .map(() => Array(n).fill(value));

const constructDiagonalMatrix = (n, value = 1) => {
  const matrix = constructSquareMatrix(n);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][i] = value;
  }
  return matrix;
};

export const PairComparisonTest = ({ task }) => {
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

  const comparisonCount = useMemo(() => combination(task.alternatives.length, 2), [task]);

  // Think of the other way to check
  const isSubmitDisabled = useMemo(() => comparisonCount !== Object.keys(taskAnswers).length, [
    comparisonCount,
    taskAnswers,
  ]);

  const handleTaskFinish = () => {
    // TODO: Save data about answers
    // Maybe dispatch action like: completeTaskAction(taskId, userId, result)
    // where result - taskAnswers
    // Then create new entry in tasks reducer,
    // don't forget to spread (...) previous values
    // completedTasks {
    //   [userId]: {
    //     [taskId]: result,
    //   }
    // }
    console.log(taskAnswers);
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
