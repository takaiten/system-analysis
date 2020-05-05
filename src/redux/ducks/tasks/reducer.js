import { omit } from 'lodash';
import * as types from './types';

const initialState = {
  tasks: {},
  usersTasks: {},
  taskAnswers: {},
};

const generateUsersObject = (usersTasks, arrayOfUsersIds, taskId) =>
  arrayOfUsersIds.reduce(
    (acc, userId) => ({
      ...acc,
      [userId]: [...(usersTasks[userId] || []), taskId],
    }),
    {},
  );

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
          [userId]: omit(state.usersTasks[userId], [taskId]),
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
            [taskId]: result,
          },
        },
      };
    }
    default:
      return state;
  }
};

export { tasksReducer };
