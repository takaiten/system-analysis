import React, { useMemo } from 'react';
import { Navbar } from '../Navbar';
import { ExpertAssignedTasksList } from '../ExpertAssignedTasksList';

const MainPageExpert = ({ user, usersTasks, tasksByIds }) => {
  const userTasksIds = useMemo(() => usersTasks[user.id], [user, usersTasks]);

  return (
    <>
      <Navbar />
      <ExpertAssignedTasksList userTasksIds={userTasksIds} tasksByIds={tasksByIds} />
    </>
  );
};

export { MainPageExpert };
