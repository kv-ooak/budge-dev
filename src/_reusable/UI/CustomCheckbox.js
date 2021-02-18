/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = withStyles({
  root: {
    color: '#ffffff',
    '&$checked': {
      color: '#ffffff',
    },
    fontSize: '16px',
  },
  checked: {},
})((props) => (
  <Checkbox
    color="default"
    {...props}
  />
));

export default CustomCheckbox;
