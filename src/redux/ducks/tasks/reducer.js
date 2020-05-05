import { omit, without } from 'lodash';
import { combinations } from 'mathjs';
import * as types from './types';

const generateUsersObject = (usersTasks, arrayOfUsersIds, taskId) =>
  arrayOfUsersIds.reduce(
    (acc, userId) => ({
      ...acc,
      [userId]: [...(usersTasks[userId] || []), taskId],
    }),
    {},
  );

const sortAlternativesIndicesByWeights = array =>
  array
    .reduce((acc, altWeight, altIndex) => [...acc, { altWeight, altIndex }], [])
    .sort((a, b) => b.altWeight - a.altWeight)
    .map(item => item.altIndex);

const getAlternativesOrder = ({ array, size }) => {
  const R = combinations(size, size - 2) + size;
  const arrayV = [];
  // const arrayC = [];
  for (let i = 0; i < size; i++) {
    let Ci = 0;
    for (let j = 0; j < size; j++) {
      Ci += array[i + size * j];
    }
    // arrayC.push(Ci);
    arrayV.push(Ci / R);
  }
  // arrayV = arrayC.map(Ci => Ci / R);
  return sortAlternativesIndicesByWeights(arrayV);
};

const initialState = {
  tasks: {},
  usersTasks: {},
  taskAnswers: {},
};

const tasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TASK: {
      const { userId, task } = payload;
      const usersWithTaskId = generateUsersObject(state.usersTasks, [...task.experts, userId], task.id);

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
        usersTasks: {
          ...state.usersTasks,
          ...usersWithTaskId,
        },
      };
    }
    case types.EDIT_TASK: {
      const { task } = payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
      };
    }
    case types.DELETE_TASK: {
      const { userId, taskId } = payload;
      return {
        ...state,
        tasks: omit(state.tasks, [taskId]),
        usersTasks: {
          [userId]: without(state.usersTasks[userId], taskId),
        },
        taskAnswers: {
          [userId]: omit(state.taskAnswers[userId], [taskId]),
        },
      };
    }
    case types.COMPLETE_TASK: {
      const { taskId, userId, result } = payload;
      return {
        ...state,
        taskAnswers: {
          ...state.taskAnswers,
          [userId]: {
            ...(state.taskAnswers[userId] || []),
            [taskId]: {
              ...result,
              order: getAlternativesOrder(result),
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export { tasksReducer };
