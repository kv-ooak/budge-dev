import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loader: {
    fontFamily: theme.typography.fontFamily,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function FullPageLoader(props) {
  const classes = useStyles();
  const { message } = props;
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
}

FullPageLoader.propTypes = {
  message: PropTypes.string,
};

FullPageLoader.defaultProps = {
  message: '',
};

export default FullPageLoader;
