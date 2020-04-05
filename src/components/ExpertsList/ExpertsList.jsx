import React from 'react';
import { Chip, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const ExpertsList = ({ expertsIds, users, onDelete }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {expertsIds.map((userId, index) => {
        const { firstName, lastName } = users[userId];
        return (
          <Chip
            key={userId}
            label={`${firstName} ${lastName}`}
            onDelete={onDelete(index)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
};

export { ExpertsList };
