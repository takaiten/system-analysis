import React from 'react';
import { Chip, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ExpertsList = ({ expertsIds, usersByIds, onDelete }) => {
  const classes = useStyles();

  return (
    <div style={{ paddingTop: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">
        Список экспертов, назначенных для оценивания этой проблемы:
      </Typography>
      <Paper className={classes.root}>
        {expertsIds.size ? (
          expertsIds.map((userId, index) => {
            const { firstName, lastName } = usersByIds[userId];
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
          <Chip label="Не назначено" className={classes.chip} />
        )}
      </Paper>
    </div>
  );
};

export { ExpertsList };
