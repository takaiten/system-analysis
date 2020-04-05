import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { List } from 'immutable';

import { expert } from '../../helpers/consts';
import { getFullName } from '../../helpers/tools';

import { AlternativesList } from '../Alternative';
import { ExpertsList } from '../ExpertsList';

const TaskCreationModal = ({ open, onClose, onForceClose, onCreate, task }) => {
  const users = {}; // TODO useSelector
  const experts = Object.values(users).filter(user => user.role === expert);

  // Title
  const [taskTittle, setTaskTittle] = useState(task?.tittle || 'Task');

  const handleTaskTittleChange = ({ target }) => setTaskTittle(target.value);

  // Alternatives
  const [alternatives, setAlternatives] = useState(task ? List(task.alternatives) : List());

  const handleAlternativeDelete = index => () => setAlternatives(prevState => prevState.delete(index));
  const handleAlternativeChange = index => ({ target }) =>
    setAlternatives(prevState => prevState.set(index, target.value));

  // Experts
  const [selectedExperts, setSelectedExperts] = useState(task ? List(task.experts) : List());

  const handleExpertDelete = index => () => setSelectedExperts(prevState => prevState.delete(index));
  const handleExpertAddition = userId => setSelectedExperts(prevState => prevState.push(userId));

  // Search
  const [search, setSearch] = useState('');

  const handleSearchChange = (event, value) => setSearch(value);
  const handleSearchSelect = (event, user, reason) => {
    if (reason === 'select-option') {
      setSearch('');
      handleExpertAddition(user.id);
    }
  };

  return (
    <Dialog open={open} onClose={onForceClose}>
      <DialogTitle id="form-dialog-title">Task creation</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Task tittle"
          value={taskTittle}
          onChange={handleTaskTittleChange}
        />
        <AlternativesList
          alternatives={alternatives.toJS()}
          onAlternativeChange={handleAlternativeChange}
          onAlternativeDelete={handleAlternativeDelete}
        />
        <ExpertsList expertsIds={selectedExperts} onDelete={handleExpertDelete} users={users} />
        <Autocomplete
          options={experts}
          getOptionLabel={getFullName}
          value={search}
          onChange={handleSearchSelect}
          onInputChange={handleSearchChange}
          renderInput={params => <TextField {...params} label="Search Experts" variant="outlined" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { TaskCreationModal };
