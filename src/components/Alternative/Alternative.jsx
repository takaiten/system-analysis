import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { AlternativesList } from './AlternativesList';

const Alternative = ({ alternatives, onAlternativeCreate, onAlternativeChange, onAlternativeDelete }) => {
  return (
    <div>
      <Typography variant="subtitle2" color="textSecondary" style={{ marginTop: '0.5rem' }}>
        Alternatives in this task:
      </Typography>
      <Button variant="contained" color="default" startIcon={<AddIcon />} onClick={onAlternativeCreate}>
        Create
      </Button>
      <AlternativesList
        alternatives={alternatives}
        onAlternativeChange={onAlternativeChange}
        onAlternativeDelete={onAlternativeDelete}
      />
    </div>
  );
};

export { Alternative };
