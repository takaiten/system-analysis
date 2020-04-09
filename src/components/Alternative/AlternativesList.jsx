import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';

import { AlternativeItem } from './AlternativeItem';

const AlternativesList = ({ alternatives, onAlternativeChange, onAlternativeDelete }) => {
  return (
    <Paper>
      <List style={{ height: '35vh', overflowY: 'auto' }}>
        {alternatives.length ? (
          alternatives.map((text, index) => (
            <AlternativeItem
              key={text}
              alternativeText={text}
              onAlternativeChange={onAlternativeChange(index)}
              onAlternativeDelete={onAlternativeDelete(index)}
            />
          ))
        ) : (
          <Paper color="secondary">
            <ListItem>
              <ListItemText>
                <Typography align="center" variant="h5" color="textSecondary">
                  No Alternatives were created
                </Typography>
              </ListItemText>
            </ListItem>
          </Paper>
        )}
      </List>
    </Paper>
  );
};

export { AlternativesList };
