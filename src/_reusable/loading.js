import React from 'react';
import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = (theme) => ({
  loader: {
    fontFamily: theme.typography.fontFamily,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = (message) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.loader}>
        <Fade in timeout={500}>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress className={classes.progress} />
            <div>
              {message}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

const Loading = ({ pastDelay, error }) => {
  if (!pastDelay) {
    return null;
  } if (error) {
    return (
      <div>
        <div>
          ERROR
        </div>
      </div>
    );
  }
  return (<Loader />);
};

Loading.defaultProps = {
  pastDelay: false,
  error: null,
};

Loading.propTypes = {
  pastDelay: PropTypes.bool,
  error: PropTypes.instanceOf(Object),
};

export default Loading;
