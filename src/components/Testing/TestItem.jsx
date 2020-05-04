import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@material-ui/core';

import { StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

const TestItem = ({ onChange, value, alternatives, firstIndex, secondIndex }) => (
  <Paper>
    <ListItem>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose your preferred alternative:</FormLabel>
        <RadioGroup aria-label="alternatives" name="alternatives" value={value} onChange={onChange}>
          <FormControlLabel
            value={`${firstIndex}-${secondIndex}-`}
            control={<Radio />}
            label={alternatives[firstIndex]}
          />
          <FormControlLabel
            value={`${secondIndex}-${firstIndex}-`}
            control={<Radio />}
            label={alternatives[secondIndex]}
          />
          <FormControlLabel
            value={`${firstIndex}-${secondIndex}+`}
            control={<Radio />}
            label="None of them"
          />
        </RadioGroup>
      </FormControl>
    </ListItem>
  </Paper>
);

export { TestItem };
