import { connect } from 'react-redux';
import { MainPageAnalyst } from './MainPageAnalyst';
import { addTaskAction, deleteTaskAction, editTaskAction } from '../../redux/ducks/tasks/actions';
import { getUser } from '../../redux/ducks/auth/selectors';
import { getTasks } from '../../redux/ducks/tasks/selectors';

const mapStateToProps = state => ({
  user: getUser(state),
  tasks: getTasks(state)
});

const mapDispatchToProps = {
  addTask: addTaskAction,
  deleteTask: deleteTaskAction,
  editTask: editTaskAction
};

const connectedMainPageAnalyst = connect(mapStateToProps, mapDispatchToProps)(MainPageAnalyst);

export { connectedMainPageAnalyst as MainPageAnalyst };

export { MainPageExpert } from './MainPageExpert';
