import { connect } from 'react-redux';
import { MainPageAnalyst } from './MainPageAnalyst';
import { MainPageExpert } from './MainPageExpert';

import { addTaskAction, deleteTaskAction, editTaskAction } from '../../redux/ducks/tasks/actions';
import { getUser, getUsersByIds, getUsersIds } from '../../redux/ducks/auth/selectors';
import { getTasks, getUsersTasks } from '../../redux/ducks/tasks/selectors';

const mapStateToPropsAnalyst = state => ({
  user: getUser(state),
  usersIds: getUsersIds(state),
  usersByIds: getUsersByIds(state),
  tasks: getTasks(state),
  usersTasks: getUsersTasks(state),
});

const mapDispatchToPropsAnalyst = {
  addTask: addTaskAction,
  deleteTask: deleteTaskAction,
  editTask: editTaskAction,
};

const connectedMainPageAnalyst = connect(mapStateToPropsAnalyst, mapDispatchToPropsAnalyst)(MainPageAnalyst);
export { connectedMainPageAnalyst as MainPageAnalyst };

const mapStateToPropsExpert = state => ({
  user: getUser(state),
  usersTasks: getUsersTasks(state),
  tasksByIds: getTasks(state),
});

const mapDispatchToPropsExpert = {};

const connectedMainPageExpert = connect(mapStateToPropsExpert, mapDispatchToPropsExpert)(MainPageExpert);
export { connectedMainPageExpert as MainPageExpert };
