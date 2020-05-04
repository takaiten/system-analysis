import React, { useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar } from '../Navbar';
import { ExpertAssignedTasksList } from '../ExpertAssignedTasksList';
import { METHODS } from '../../helpers/consts';

const MainPageExpert = ({ user, usersTasks, tasksByIds }) => {
  const userTasksIds = useMemo(() => usersTasks[user.id], [user, usersTasks]);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <FormControl style={{ width: '20%' }} variant="outlined" size="small" className={classes.formControl}>
        <InputLabel id="label">Method</InputLabel>
        <Select labelId="label">
          {METHODS.map(role => (
            <MenuItem value={role.label} key={role.id}>
              {role.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ExpertAssignedTasksList userTasksIds={userTasksIds} tasksByIds={tasksByIds} />
    </>
  );
};

export { MainPageExpert };
