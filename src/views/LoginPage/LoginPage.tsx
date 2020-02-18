import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
//import Checkbox from '@material-ui/core/Checkbox';
//import Input from '@material-ui/core/Input';
//import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage, injectIntl } from 'react-intl';
import LoginPageStyle from './LoginPageStyle';
import { HOME_PAGE } from '../../configuration/Config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction, logoutAction, saveLoginAction } from '../../redux/actions/session/SessionActions';
import { setMacAddressAction, setListMacAddressAction } from "../../redux/actions/mac_address/MacAddressActions";
import { checkCashierMacAddressService } from "../../redux/services/SessionService";
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import { IS_DESKTOP_APPLICATION, WEB_INSTALLER_URL } from '../../configuration/Config';
//import {ipcRenderer} from  'electron';

interface LoginPageProps extends WithStyles<typeof LoginPageStyle>{
  //additional props here
}

class LoginPage extends React.Component<LoginPageProps> {

  username = '';
  password = '';
  state = null;

  ipcRenderer = null;
  
  static propTypes = {
    classes: PropTypes.object,

    loginAction: PropTypes.func.isRequired,
    logoutAction: PropTypes.func,
    saveLoginAction: PropTypes.func,
    setMacAddressAction: PropTypes.func,
    setListMacAddressAction: PropTypes.func,
  
    session: PropTypes.object,

    mac_address: PropTypes.string,
    list_mac_address: PropTypes.array
  }

  constructor(props)
  {
    super(props);

    if(IS_DESKTOP_APPLICATION)
    {
      this.ipcRenderer = window['ipcRenderer'];
    }

    this.state = {
      username: '',
      password: '',
      mac_address: '',
      list_mac_address: [],
      errorMessage: '',
      isErrorMessage: false,
      showPassword: false,
      loginStarted: false
    }

    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onKeyPressPassword = this.onKeyPressPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

    this.handleDetectMacAddress = this.handleDetectMacAddress.bind(this);

    if(IS_DESKTOP_APPLICATION)
    {
      try{
        this.ipcRenderer.on('detect-mac-address', this.handleDetectMacAddress);
        if(this.props['mac_address']['mac_address']['mac_address']){
          this.state = 
          {
            ...this.state,
            mac_address: this.props['mac_address']['mac_address']['mac_address'],
            list_mac_address: this.props['mac_address']['list_mac_address']['list_mac_address']
          };
        }
      }catch(e)
      {
        if(localStorage.getItem('reduxState') !== null)
        {
          let reduxState = JSON.parse(localStorage.getItem('reduxState'));
          this.state = 
          {
            ...this.state,
            mac_address: reduxState.mac_address.mac_address.mac_address,
            list_mac_address: reduxState.mac_address.list_mac_address.list_mac_address
          };
        }
      }

      if(this.state.mac_address == '')
      {
        if(localStorage.getItem('reduxState') !== null)
        {
          let reduxState = JSON.parse(localStorage.getItem('reduxState'));
          this.state = 
          {
            ...this.state,
            mac_address: reduxState.mac_address.mac_address.mac_address,
            list_mac_address: reduxState.mac_address.list_mac_address.list_mac_address
          };
        }
      }

    }
  }
  
  componentDidMount()
  {
    
  }

  componentWillUnmount()
  {
    // window.ipcRenderer.removeListener('CATCH_ON_MAIN', this.handleDetectMacAddress);
  }

  handleDetectMacAddress(event, data)
  {
    /*
    console.log(event);
    console.log(data);

    let list_network_interface = JSON.parse(data.data);

    console.log(list_network_interface);

    let list_network_interface_array = [];
    for(let [key, value] of Object.entries(list_network_interface))
    {
      list_network_interface_array.push(value);
    }

    console.log(list_network_interface_array);
  
    let mac_address = list_network_interface_array[0].mac;
    */

    try{
      let list_network_interface = JSON.parse(data.data);

      let mac_address = list_network_interface[Object.keys(list_network_interface)[0]]['mac'].toUpperCase();

      let list_mac_address = [];
      for(let [key, value] of Object.entries(list_network_interface))
      {
        list_mac_address.push(value['mac'].toUpperCase());
      }

      if(IS_DESKTOP_APPLICATION)
        {
          try{
            this.props['setMacAddressAction']({ mac_address: mac_address} );
            this.props['setListMacAddressAction']({ list_mac_address: list_mac_address })
          }catch(e)
          {
            if(localStorage.getItem('reduxState') !== null)
            {
              let reduxState = JSON.parse(localStorage.getItem('reduxState'));
              this.setState({
                mac_address: reduxState.mac_address.mac_address.mac_address,
                list_mac_address: reduxState.mac_address.list_mac_address.list_mac_address
              });
            }
          }
        }

      this.setState({
        mac_address: mac_address,
        list_mac_address: list_mac_address
      });
    }catch(e)
    {
      if(localStorage.getItem('reduxState') !== null)
      {
        let reduxState = JSON.parse(localStorage.getItem('reduxState'));
        this.setState({
          mac_address: reduxState.mac_address.mac_address.mac_address,
          list_mac_address: reduxState.mac_address.list_mac_address.list_mac_address
        });
      }
    }
    
  }

  handleUsername(event) 
  {
    this.setState({ username: event.target.value || '' });
  }
  
  handlePassword(event)
  {
    this.setState({ password: event.target.value || '' });
  }

  onKeyPressPassword(event)
  {
    if(event.charCode === 13) {
      this.onLoginButtonClick();
    }
  }

  handleClickShowPassword()
  {
    this.setState(state => ({ showPassword: !state['showPassword'] }));
  }

  onLoginButtonClick()
  {
    if(!this.state.username || !this.state.password){
      this.setState(
        {
          errorMessage: <FormattedMessage id="Username and password are required values !" defaultMessage="Username and password are required values !" />,
          isErrorMessage: true,
          loginStarted: false
        }
      );
      return;
    }

    let loginData = {
      username: this.state.username,
      password: this.state.password,
      mac_address: this.state.mac_address
    };  

    this.setState(
      {
        loginStarted: true
      }
    );

    
    if(IS_DESKTOP_APPLICATION /*&& this.state.mac_address != ''*/)
    {
      if(this.state.mac_address == '')
      {
        this.setState({
          mac_address: this.props['mac_address']['mac_address']['mac_address'],
          list_mac_address: this.props['mac_address']['list_mac_address']['list_mac_address']
        });
      }
      checkCashierMacAddressService(loginData).then((response) => {
        if(response.status === 'NOK'){
          this.setState(
            {
              errorMessage: <FormattedMessage id="Login failed. Mac address is invalid !" defaultMessage="Login failed. Mac address is invalid !" />,
              isErrorMessage: true,
              loginStarted: false
            }
          );
        }else{
          this.props['loginAction'](loginData).then((response) => {
            if(response.value.status === 'OK'){
    
              this.props['saveLoginAction'](response.value);
    
              this.setState(
                {
                  loginStarted: false
                }
              );
              
              this.props['history'].push(HOME_PAGE);
            }else{
              this.setState(
                {
                  errorMessage: response.value.message,
                  isErrorMessage: true,
                  loginStarted: false
                }
              );
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            errorMessage: <FormattedMessage id="Login failed." defaultMessage="Login failed." />,
            isErrorMessage: true,
            loginStarted: false
          }
        );
      });
    }
    else
    {
      this.props['loginAction'](loginData).then((response) => {
        if(response.value.status === 'OK'){

          this.props['saveLoginAction'](response.value);

          this.setState(
            {
              loginStarted: false
            }
          );
          
          this.props['history'].push(HOME_PAGE);
        }else{
          this.setState(
            {
              errorMessage: response.value.message,
              isErrorMessage: true,
              loginStarted: false
            }
          );
        }
      });
    }
  }

  render() {
    return (
      <main className={this.props.classes['main']}>
        <CssBaseline />
        <Paper className={this.props.classes['paper']}>
          <Avatar className={this.props.classes['avatar']}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="Sign in to start your session" defaultMessage="Sign in to start your session" />
          </Typography>
          <FormHelperText error={this.state.isErrorMessage} variant={'filled'} className={this.props.classes["validationMessage"]}>
            {this.state.errorMessage}
          </FormHelperText>
          <form className={this.props.classes['form']}>            
            <TextField              
              fullWidth
              className={classNames(this.props.classes.margin, this.props.classes.textField)}
              variant="outlined"
              type={'text'}
              label={<FormattedMessage id="Username" defaultMessage="Username" />}
              onChange={this.handleUsername}
              value={this.state.username}
            />
            <TextField
              fullWidth              
              className={classNames(this.props.classes.margin, this.props.classes.textField)}
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label={<FormattedMessage id="Password" defaultMessage="Password" />}
              onChange={this.handlePassword}
              onKeyPress={this.onKeyPressPassword}
              value={this.state.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            { this.state.mac_address &&
              <TextField
                fullWidth
                className={classNames(this.props.classes.margin, this.props.classes.textField)}
                variant="outlined"
                type='text'
                label={<FormattedMessage id="Mac Address" defaultMessage="Mac Address" />}
                value={this.state.mac_address}
              />
            }

            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              className={this.props.classes['submit']}
              onClick={this.onLoginButtonClick}
              disabled={this.state.loginStarted}
            >
              { this.state.loginStarted && <CircularProgress size={24} thickness={4} variant="indeterminate" /> }
              <FormattedMessage id="Login" defaultMessage="Login" />
            </Button>

            { !IS_DESKTOP_APPLICATION &&
            <Button 
            fullWidth
            variant="contained"
            size="large"
            color="default"
            className={this.props.classes['submit']}
            href={WEB_INSTALLER_URL}
            >
              <FormattedMessage id="Download WEB INSTALLER" defaultMessage="Download WEB INSTALLER" />
            </Button>
            }
          </form>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { session } = state.session;
  const { mac_address } = state.mac_address.mac_address;
  const { list_mac_address } = state.mac_address.list_mac_address;
  
  return { session, mac_address, list_mac_address };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loginAction, logoutAction, saveLoginAction, setMacAddressAction, setListMacAddressAction }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(withStyles(LoginPageStyle)(LoginPage));

export default injectIntl(hoc);