import * as types from './types';

const initialState = {
  tasks: {}, // task[userId] = task[]
  taskIds: {} // taskIds[userId] = taskIds[]
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
        },
        taskIds: {
          ...state.taskIds,
          [userId]: [...state.taskIds[userId], task.id]
        }
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
    default:
      return state;
  }
};

export { tasksReducer };
