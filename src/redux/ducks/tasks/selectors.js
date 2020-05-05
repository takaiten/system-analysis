export const getTasks = state => state.tasks?.tasks;
export const getUsersTasks = state => state.tasks?.usersTasks;
export const getCompleteTasks = state => state.tasks?.taskAnswers;
export const getUserCompletedTasks = state =>
  Object.keys(state.tasks?.taskAnswers[state.auth?.user?.id]).map(Number);
