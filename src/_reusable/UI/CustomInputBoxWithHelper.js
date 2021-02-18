/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import withStyles from '@material-ui/core/styles/withStyles';

import green from '@material-ui/core/colors/green';

const CustomInputFadeBox = ({ isfocus, error }) => {
  const CustomInputBox = withStyles((theme) => ({
    root: {
      position: 'absolute',
      height: theme.spacing(10),
      width: '100%',
      padding: theme.spacing(0, 2.4),
      borderRadius: theme.spacing(2),
      border: '4px solid',
      borderColor: error ? theme.palette.error.light : green[200],

    },
  }))(Box);

  return (
    <Fade in={isfocus === 'true'}>
      <CustomInputBox />
    </Fade>
  );
};

CustomInputFadeBox.defaultProps = {
  error: null,
};

CustomInputFadeBox.propTypes = {
  isfocus: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

const CustomHelperCollapseBox = ({ isfocus, helpertext, error }) => {
  const CustomHelperBox = withStyles((theme) => ({
    root: {
      position: 'absolute',
      marginTop: theme.spacing(10),
      width: '100%',
      padding: theme.spacing(0, 2.4),
      marginBottom: theme.spacing(0),
      border: 'none',
      color: error === true ? theme.palette.error.light : theme.palette.grey[500],
    },
  }))(Box);

  return (
    <Fade
      in={error || isfocus === 'true'}
      timeout={{ appear: 2000, enter: 500, exit: 400 }}
    >
      <CustomHelperBox>
        {helpertext}
      </CustomHelperBox>
    </Fade>
  );
};

CustomHelperCollapseBox.defaultProps = {
  helpertext: null,
  error: null,
};

CustomHelperCollapseBox.propTypes = {
  isfocus: PropTypes.string.isRequired,
  helpertext: PropTypes.string,
  error: PropTypes.bool,
};

const CustomInputBase = withStyles((theme) => ({
  root: {
    position: 'absolute',
    height: theme.spacing(10),
    padding: theme.spacing(0, 2.4),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    display: 'block',
    backgroundColor: '#fff',
    borderColor: theme.palette.grey[300],
    border: '1px solid',
  },
  input: {
    '&::placeholder': {
      fontFamily: theme.typography.fontFamily,
      color: '#3c3257',
    },
    fontSize: theme.typography.h4.fontSize,
    padding: theme.spacing(2.2, 0),
    color: '#808080',
  },
  inputAdornedEnd: {
    position: 'absolute',
  },
}))(InputBase);

const CustomInputBoxWithHelper = (props) => {
  const { isfocus, helpertext, error } = props;

  return (
    <>
      <Box css={{ position: 'relative' }}>
        <CustomInputBase {...props} />
        <CustomInputFadeBox isfocus={isfocus} error={error} />
        <CustomHelperCollapseBox isfocus={isfocus} helpertext={helpertext} error={error} />
      </Box>
    </>
  );
};

CustomInputBoxWithHelper.defaultProps = {
  helpertext: null,
  error: null,
};

CustomInputBoxWithHelper.propTypes = {
  isfocus: PropTypes.string.isRequired,
  helpertext: PropTypes.string,
  error: PropTypes.bool,
};

export default CustomInputBoxWithHelper;
