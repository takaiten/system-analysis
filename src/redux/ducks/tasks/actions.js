import * as types from './types';

export const addTaskAction = (task, userId) => ({
  type: types.ADD_TASK,
  payload: {
    task,
    userId,
  },
});

export const editTaskAction = task => ({
  type: types.ADD_TASK,
  payload: {
    task,
  },
});

export const deleteTaskAction = (userId, taskId) => ({
  type: types.DELETE_TASK,
  payload: {
    userId,
    taskId,
  },
});

export const completeTaskAction = ({ taskId, userId, result: { array, size } }) => ({
  type: types.COMPLETE_TASK,
  payload: {
    taskId,
    userId,
    result: {
      array,
      size,
    },
  },
});
