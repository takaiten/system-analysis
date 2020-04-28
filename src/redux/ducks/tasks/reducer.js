import { omit } from 'lodash';
import * as types from './types';

const initialState = {
  tasks: {},
  usersTasks: {},
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
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
      };
    }
    case types.DELETE_TASK: {
      const { userId, taskId } = payload;
      return {
        tasks: omit(state.tasks, [taskId]),
        usersTasks: {
          [userId]: omit(state.usersTasks[userId], [taskId]),
        },
      };
    }
    default:
      return state;
  }
};

export { tasksReducer };
