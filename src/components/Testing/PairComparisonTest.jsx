import React, { useCallback, useMemo, useState } from 'react';
import { Fab, ListItemText, Paper, Typography } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { TestItem } from './TestItem';

import { useStyles } from '../MainPage/styles';
import { StyledList as List, StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

import { combination } from '../../helpers/tools';

export const PairComparisonTest = ({ task }) => {
  const classes = useStyles();
  // stores task answers like this : {[test number]: index of selected alternative }
  const [taskAnswers, setTaskAnswers] = useState({});

  const handleChange = ({ target }) => {
    const [, answerIndex, testNumber] = target.value.match(/(-?\d+)-(\d+)/);
    setTaskAnswers(prevState => ({ ...prevState, [+testNumber]: Number(answerIndex) }));
  };

  const comparisonCount = useMemo(() => combination(task.alternatives.length, 2), [task]);

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
  }, [task]);

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
