import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { AlternativesList } from './AlternativesList';

const Alternative = ({
  canEdit,
  alternatives,
  onAlternativeCreate,
  onAlternativeChange,
  onAlternativeDelete,
}) => {
  return (
    <div>
      <Typography variant="subtitle2" color="textSecondary" style={{ marginTop: '0.5rem' }}>
        Набор альтернатив:
      </Typography>
      {canEdit && (
        <Button variant="contained" color="default" startIcon={<AddIcon />} onClick={onAlternativeCreate}>
          Создать
        </Button>
      )}
      <AlternativesList
        canEdit={canEdit}
        alternatives={alternatives}
        onAlternativeChange={onAlternativeChange}
        onAlternativeDelete={onAlternativeDelete}
      />
    </div>
  );
};

export { Alternative };
