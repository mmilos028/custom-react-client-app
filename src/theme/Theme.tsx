import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import { white } from 'material-ui/styles/colors';

const Theme = createMuiTheme({
  palette: {
    //primary: blue,
    primary: {
      main: "#607D8B"        
      //main: "#000000"
    },
    //secondary: pink,
    secondary: red,
    error: red
  },  

  overrides: {
    MuiAppBar: {
      root: {
        color: '#ffffff',
        backgroundColor: '#607D8B',
        //backgroundColor: '#000000',
      }      
    },
    MuiInput: {
      'disabled': {
        //color: '#585858'
        color: '#000000'
      }
    },
    MuiOutlinedInput: {
      'disabled': {
        //color: '#585858'
        color: '#000000'
      }
    },

  },  
  typography: {
    useNextVariants: true,
  }
});

export default Theme;