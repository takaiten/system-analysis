import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '80vh',
  overflowY: 'auto',
  '&& > div': {
    marginTop: '16px',
  },
});

export const StyledListItem = styled(ListItem)({
  width: '50vw',
});
