import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100vh - 96px)',
  overflowY: 'auto',
  '&& > div': {
    marginTop: '16px',
  },
});

export const StyledListItem = styled(ListItem)({
  paddingTop: '1rem',
  width: '50vw',
});
