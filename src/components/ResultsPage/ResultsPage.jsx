import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UsersResults } from './UsersResults';
import { Navbar } from '../Navbar';
import { getTasks } from '../../redux/ducks/tasks/selectors';

const ResultsPage = ({ match }) => {
  const taskId = useMemo(() => match.params.id, [match]);
  const tasksByIds = useSelector(getTasks);

  const renderUsersResults = useCallback(() => {
    const task = tasksByIds[taskId];
    return (
      <>
        <UsersResults task={task} />
      </>
    );
  }, [tasksByIds, taskId]);

  return (
    <>
      <Navbar />
      {renderUsersResults()}
    </>
  );
};

export { ResultsPage };
