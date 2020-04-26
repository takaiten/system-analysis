import { omit } from 'lodash';
import * as types from './types';

const initialState = {
  tasks: {} // task[userId] = task[]
  // taskIds: []
};

const tasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TASK: {
      const { userId, task } = payload;
      return {
        tasks: {
          ...state.tasks,
          [userId]: {
            ...state.tasks[userId],
            [task.id]: task
          }
        }
        // taskIds: [...state.taskIds, task.id]
      };
    }
    case types.EDIT_TASK: {
      const { userId, task } = payload;
      return {
        tasks: {
          ...state.tasks,
          [payload.userId]: {
            ...state.tasks[userId],
            [task.id]: task
          }
        }
      };
    }
    case types.DELETE_TASK: {
      const { userId, taskId } = payload;
      return {
        tasks: {
          ...state.tasks,
          [userId]: omit(state.tasks[userId], [taskId])
        }
        // taskIds: omit(state.taskIds, [taskId])
      };
    }
    default:
      return state;
  }
};

export { tasksReducer };
