import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@material-ui/core';

import { StyledListItem as ListItem } from '../ListAssignedTasks/AssignedList.style';

const TestItem = ({ handleChange, value, firstAlter, secondAlter }) => {
  return (
    <Paper>
      <ListItem>
        <FormControl component="fieldset">
          <FormLabel component="legend">choose your preferred alternative</FormLabel>
          <RadioGroup aria-label="alternatives" name="alternatives" value={value} onChange={handleChange}>
            <FormControlLabel value="firstAltenative" control={<Radio />} label={firstAlter} />
            <FormControlLabel value="secondAltenative" control={<Radio />} label={secondAlter} />
            <FormControlLabel value="other" control={<Radio />} label="none of them" />
          </RadioGroup>
        </FormControl>
      </ListItem>
    </Paper>
  );
};

export { TestItem };
