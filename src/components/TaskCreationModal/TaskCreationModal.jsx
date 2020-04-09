import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { List } from 'immutable';
import { useSelector } from 'react-redux';

import { METHODS, expert } from '../../helpers/consts';
import { getFullName } from '../../helpers/tools';
import { getUsersByIds, getUsersIds } from '../../redux/ducks/auth/selectors';

import { Alternative } from '../Alternative';
import { ExpertsList } from '../ExpertsList';

const TaskCreationModal = ({ open, modalTitle, onClose, onForceClose, onCreate, task }) => {
  const usersIds = useSelector(getUsersIds);
  const usersByIds = useSelector(getUsersByIds);

  const experts = usersIds
    .filter(userId => usersByIds[userId].role === expert)
    .map(userId => usersByIds[userId]);

  // Title
  const [taskTittle, setTaskTittle] = useState(task?.tittle || 'Task');

  const handleTaskTittleChange = ({ target }) => setTaskTittle(target.value);

  // Method
  const [method, setMethod] = useState(task ? task.method : METHODS[0].label);

  const handleMethodChange = ({ target }) => setMethod(target.value);

  // Alternatives
  const [alternatives, setAlternatives] = useState(task ? List(task.alternatives) : List());

  const handleAlternativeCreate = () =>
    setAlternatives(prevState => prevState.push(`Alternative #${prevState.size + 1}`));
  const handleAlternativeDelete = index => () => setAlternatives(prevState => prevState.delete(index));
  const handleAlternativeChange = index => value => setAlternatives(prevState => prevState.set(index, value));

  // Experts
  const [selectedExperts, setSelectedExperts] = useState(task ? List(task.experts) : List());

  const handleExpertDelete = index => () => setSelectedExperts(prevState => prevState.delete(index));
  const handleExpertAddition = userId => setSelectedExperts(prevState => prevState.push(userId));

  // Search
  const [search, setSearch] = useState({});

  const handleSearchChange = (event, user) => setSearch(user);
  const handleSearchSelect = (event, user, reason) => {
    if (reason === 'select-option') {
      setSearch('');
      handleExpertAddition(user.id);
    }
  };

  // on Create return all data from form
  const handleCreate = () =>
    onCreate({
      title: taskTittle,
      alternatives: alternatives.toJS(),
      experts: selectedExperts.toJS()
    });

  return (
    <Dialog open={open} onClose={onForceClose} maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <Grid container item direction="row" wrap="nowrap">
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Task tittle"
            value={taskTittle}
            onChange={handleTaskTittleChange}
          />
          <FormControl style={{ marginTop: '5px', width: '40%' }}>
            <InputLabel id="label">Method</InputLabel>
            <Select labelId="label" value={method} onChange={handleMethodChange}>
              {METHODS.map(role => (
                <MenuItem value={role.label} key={role.id}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Alternative
          alternatives={alternatives.toJS()}
          onAlternativeCreate={handleAlternativeCreate}
          onAlternativeChange={handleAlternativeChange}
          onAlternativeDelete={handleAlternativeDelete}
        />
        <ExpertsList expertsIds={selectedExperts} onDelete={handleExpertDelete} users={usersByIds} />
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
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { TaskCreationModal };
