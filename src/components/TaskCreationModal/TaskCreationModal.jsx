import React, { useEffect, useMemo, useState } from 'react';
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
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { List } from 'immutable';

import { METHODS } from '../../helpers/consts';
import { getFullName } from '../../helpers/tools';

import { Alternative } from '../Alternative';
import { ExpertsList } from '../ExpertsList';

const TaskCreationModal = ({
  open,
  modalTitle,
  onClose,
  onForceClose,
  onCreate,
  onEdit,
  task,
  experts,
  usersByIds,
}) => {
  // Title
  const [taskTittle, setTaskTittle] = useState('Task');

  const handleTaskTittleChange = ({ target }) => setTaskTittle(target.value);

  // Method
  const [method, setMethod] = useState(METHODS[0].label);

  const handleMethodChange = ({ target }) => setMethod(target.value);

  // Alternatives
  const [alternatives, setAlternatives] = useState(List());

  const handleAlternativeCreate = () =>
    setAlternatives(prevState => prevState.push(`Alternative #${prevState.size + 1}`));
  const handleAlternativeDelete = index => () => setAlternatives(prevState => prevState.delete(index));
  const handleAlternativeChange = index => value => setAlternatives(prevState => prevState.set(index, value));

  // Experts
  const [selectedExperts, setSelectedExperts] = useState(List());

  const handleExpertDelete = index => () => setSelectedExperts(prevState => prevState.delete(index));
  const handleExpertAddition = userId => setSelectedExperts(prevState => prevState.push(userId));

  const notSelectedExperts = useMemo(() => experts.filter(user => !selectedExperts.includes(user.id)), [
    experts,
    selectedExperts,
  ]);

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
      method,
      title: taskTittle,
      alternatives: alternatives.toJS(),
      experts: selectedExperts.toJS(),
    });
  const handleEdit = () =>
    onEdit({
      ...task,
      title: taskTittle,
      experts: selectedExperts.toJS(),
    });

  useEffect(() => {
    if (task) {
      setTaskTittle(task.title);
      setMethod(task.method);
      setAlternatives(List(task.alternatives));
      setSelectedExperts(List(task.experts));
    }
    return () => {
      setTaskTittle('Task');
      setMethod(METHODS[0].label);
      setAlternatives(List());
      setSelectedExperts(List());
    };
  }, [task]);

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
            <Select labelId="label" value={method} onChange={handleMethodChange} disabled={!!task}>
              {METHODS.map(role => (
                <MenuItem value={role.label} key={role.id}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <ExpertsList expertsIds={selectedExperts} onDelete={handleExpertDelete} usersByIds={usersByIds} />
        <Autocomplete
          options={notSelectedExperts}
          getOptionLabel={getFullName}
          value={search}
          onChange={handleSearchSelect}
          onInputChange={handleSearchChange}
          renderInput={params => <TextField {...params} label="Search Experts" variant="outlined" />}
        />
        <Alternative
          canEdit={!task}
          alternatives={alternatives.toJS()}
          onAlternativeCreate={handleAlternativeCreate}
          onAlternativeChange={handleAlternativeChange}
          onAlternativeDelete={handleAlternativeDelete}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {task ? (
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { TaskCreationModal };
