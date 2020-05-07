import List from '@material-ui/core/List';
import { styled } from '@material-ui/core/styles';

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  '&& > div': {
    marginTop: '16px',
  },
});
