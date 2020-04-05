import React from 'react';
import { List } from '@material-ui/core';

import { AlternativeItem } from './AlternativeItem';

const AlternativesList = ({ alternatives, onAlternativeChange, onAlternativeDelete }) => {
  return (
    <List>
      {alternatives.map((text, index) => (
        <AlternativeItem
          key={text}
          alternativeText={text}
          onAlternativeChange={onAlternativeChange(index)}
          onAlternativeDelete={onAlternativeDelete(index)}
        />
      ))}
    </List>
  );
};

export { AlternativesList };
