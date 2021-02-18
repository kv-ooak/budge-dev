import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const CustomButton = withStyles((theme) => ({
  root: {
    fontSize: '1rem',
    letterSpacing: theme.spacing(0.4),
    borderRadius: theme.spacing(4),
    lineHeight: theme.spacing(0.4),
    marginTop: theme.spacing(0),
    padding: theme.spacing(2, 4),
    maxWidth: '80%',
    minWidth: '80%',
    textTransform: 'uppercase',
    fontFamily: '"Montserrat-SemiBold", sans-serif',
    color: '#fff',
    backgroundColor: '#57b846',
    display: 'inline',
    alignItems: 'center',
    boxShadow: 'none',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'green',
    },
    '&:focus': {
      color: '#fff',
      backgroundColor: theme.palette.green[300],
    },
  },
}))(Button);

export default CustomButton;
