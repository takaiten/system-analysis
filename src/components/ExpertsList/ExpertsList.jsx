import React from 'react';
import { Chip, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const ExpertsList = ({ expertsIds, users, onDelete }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle2" color="textSecondary">
        Experts on this task:
      </Typography>
      <Paper className={classes.root}>
        {expertsIds.length ? (
          expertsIds.map((userId, index) => {
            const { firstName, lastName } = users[userId];
            return (
              <Chip
                key={userId}
                label={`${firstName} ${lastName}`}
                onDelete={onDelete(index)}
                className={classes.chip}
              />
            );
          })
        ) : (
          <Chip label="No users" className={classes.chip} />
        )}
      </Paper>
    </div>
  );
};

export { ExpertsList };
