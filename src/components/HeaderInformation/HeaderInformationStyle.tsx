import { Theme, createStyles } from '@material-ui/core';

const HeaderInformationStyle = (theme: Theme) => createStyles({
  
  content: {
    display: 'block',
    position: 'relative',
    top: 0,
    left: 0,
    height: 30,
    width: '100%',
    zIndex: 1,
    borderBottom: '1px solid black'
  },
  textUsername: {
    marginRight: 50
  }

});

export default HeaderInformationStyle;