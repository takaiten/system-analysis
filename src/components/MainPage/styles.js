import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  fab2: {
    position: 'absolute',
    bottom: theme.spacing(5),
    left: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
}));
