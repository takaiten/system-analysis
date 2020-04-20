import * as types from './types';

export const addTaskAction = (task, userId) => ({
  type: types.ADD_TASK,
  payload: {
    task,
    userId
  }
});

export const editTaskAction = (task, userId) => ({
  type: types.ADD_TASK,
  payload: {
    task,
    userId
  }
});

export const deleteTaskAction = (userId, taskId) => ({
  type: types.DELETE_TASK,
  payload: {
    userId,
    taskId
  }
});
