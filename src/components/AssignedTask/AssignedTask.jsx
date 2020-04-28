import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getTasks } from '../../redux/ducks/tasks/selectors';

import { Navbar } from '../Navbar';

export const AssignedTask = ({ match }) => {
  const taskId = useMemo(() => match.params.id, [match]);
  const tasksByIds = useSelector(getTasks);

  const renderTaskMethod = useCallback(() => {
    // const task = tasksByIds[taskId];
    // TODO: Switch on method
    // TODO: Return component with testing
    return <></>;
  }, [tasksByIds, taskId]);

  return (
    <>
      <Navbar />
      {renderTaskMethod()}
    </>
  );
};
