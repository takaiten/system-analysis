import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getTasks } from '../../redux/ducks/tasks/selectors';
import { getUser } from '../../redux/ducks/auth/selectors';
import { PairComparisonTest } from '../Testing/PairComparisonTest';

import { Navbar } from '../Navbar';

export const AssignedTask = ({ match }) => {
  const taskId = useMemo(() => match.params.id, [match]);
  const tasksByIds = useSelector(getTasks);
  const user = useSelector(getUser);

  const renderTaskMethod = useCallback(() => {
    const task = tasksByIds[taskId];
    // TODO: Switch on method
    // TODO: Return component with testing
    return (
      <>
        <PairComparisonTest task={task} taskId={Number(taskId)} userId={user.id} />
      </>
    );
  }, [user, tasksByIds, taskId]);

  return (
    <>
      <Navbar />
      {renderTaskMethod()}
    </>
  );
};
