import React from 'react';
import { Button, ButtonGroup, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const AssignedItem = ({ task, onTaskDelete, onEditClick, onViewClick }) => {
  return (
    <Paper elevation={5}>
      <ListItem key={task.id} style={{ paddingTop: '1rem', width: '50vw' }}>
        <ListItemText>
          <Typography variant="h4" align="center">
            {task.title}
          </Typography>
        </ListItemText>
      </ListItem>
      <ButtonGroup variant="contained" fullWidth>
        <Button onClick={onEditClick}>Редактировать</Button>
        <Button onClick={onViewClick} style={{ backgroundColor: green[500], color: '#FFF' }}>
          Посмотреть результаты
        </Button>
        <Button onClick={onTaskDelete} style={{ backgroundColor: red[500], color: '#FFF' }}>
          Удалить
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export { AssignedItem };
