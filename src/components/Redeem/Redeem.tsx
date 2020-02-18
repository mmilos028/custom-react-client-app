import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//import InputLabel from '@material-ui/core/InputLabel';
//import IconButton from '@material-ui/core/IconButton';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
//import SaveIcon from '@material-ui/icons/Save';
//import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RedeemStyle from "./RedeemStyle";
import classNames from 'classnames';
import { DEBUG_CONSOLE, REST_SERVICE_BASE_URL } from '../../configuration/Config';
import { saveLoginAction } from '../../redux/actions/session/SessionActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateTimeHelper from '../../helpers/DateTimeHelper';
//import Clear from '@material-ui/icons/Clear';

import {
  searchListVouchersService
} 
  from "../../redux/services/administration/vouchers/VouchersService";

import {
  getCardCreditsService,
  resetCardCreditsService
} from "../../redux/services/RedeemCardService";

import {
  validateSessionAction
} from '../../redux/actions/session/SessionActions';

import { IS_DESKTOP_APPLICATION } from '../../configuration/Config';

import ConfirmRedeemDialog from "./confirmRedeemDialog/ConfirmRedeemDialog";    

class Redeem extends React.Component {

  classes = null;

  refBarcodeField = null;

  refSerialNumberField = null;

  refPlayerSearchField = null;

  state = {
    barcode: '',
    amount: '',

    serial_number: '',

    errorMessage: '',
    isErrorMessage: false,
    successMessage: '',
    isSuccessMessage: false,

    start_serial_number: '',
    end_serial_number: '',

    game_client_qr_code_url: { value: 'http://www.example.com/', label: 'WWW.EXAMPLE.COM - HTTP' },

    barcode_focus: true,
    redeem_button_disabled: true,

    serial_number_focus: false,

    open_redeem_dialog: false,

    list_players: [],
    filter_list_players: null

  };

  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,
    saveLoginAction: PropTypes.func.isRequired
  }

  loginData = null;

  constructor(props, context)
  {
    super(props, context);

    this.classes = props.classes;

    this.handleChangeBarcode = this.handleChangeBarcode.bind(this);
    this.handleChangeSerialNumber = this.handleChangeSerialNumber.bind(this);

    this.handleClickCardData = this.handleClickCardData.bind(this);

    this.handleChangeSearchPlayer = this.handleChangeSearchPlayer.bind(this);

    this.handleClickRedeemButton = this.handleClickRedeemButton.bind(this);
    this.handleConfirmRedeem = this.handleConfirmRedeem.bind(this);
    this.handleCancelRedeem = this.handleCancelRedeem.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);

    this.refBarcodeField = React.createRef();
    this.refSerialNumberField = React.createRef();
    this.refPlayerSearchField = React.createRef();
  }

  componentWillUnmount()
  {
  }

  componentDidMount()
  {
    
    this.loadData();      
  }

  loadData()
  {
    if(DEBUG_CONSOLE){
      console.log("Redeem :: loadData");
      console.log(this.props['session']);
    }

    const loginData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id      
    };
    this.props['validateSessionAction'](loginData)
      .then((response) => {
        if (DEBUG_CONSOLE) {
          console.log(response);
        }
        if ((!response.value.status && response.value.status != "OK") || response.value.yes_no != 'Y') {
          this.props['logoutAction'](loginData)
            .then((response) => {
              if(!IS_DESKTOP_APPLICATION)
              {
                localStorage.clear();
              }
              this.props['history'].push('/login');
            });
        }
       

        const reportData = {
          backoffice_session_id: this.props['session'].session.backoffice_session_id,
          jwt_token: this.props['session'].session.jwt_token,
    
          page_number: 1,
          per_page: 1000,
          serial_number: '',
          affiliate_owner: this.props['session'].session.parent_affiliate_id || '', ///affiliate_id
          affiliate_creator: this.props['session'].session.affiliate_id || '', ///affiliate_id
          used_by_player: '',
          player_id_bound: '',
          activation_date: '',
          amount: '',
          prepaid_code: '',
          currency: this.props['session'].session.result.currency_out || '', ////
          promo_card: 'REAL MONEY', ////
          status: '', ///U or A
          created_date: '',
          date_of_use: '',
          username: '',
          refill_status: '',
          expire_before: '',
          expire_after: DateTimeHelper.getFormattedDateFromDatePickerVouchers(new Date()),
    
        };
    
        searchListVouchersService(reportData)
        .then((response) => {
          let newResponse = response.filter((item) => {
            //return item.player_id_bound != null;
            return (item.status == 'A' || item.status == 'U') && item.player_id_bound != null;
          });
    
          newResponse = new Set(newResponse);
    
          newResponse = Array.from(newResponse);
    
          this.setState(
            {
              list_players: newResponse,
              filter_list_players: newResponse,
            }
          )
        })
        .catch((error) => {
          console.log(error);
        });


      })
      .catch((error) => {
        console.log(error);
        this.props['logoutAction'](loginData)
          .then((response) => {
            if(!IS_DESKTOP_APPLICATION)
            {
              localStorage.clear();
            }
            this.props['history'].push('/login');
          });
      });
    
  }

  //change amount event
  handleChangeAmount(event, newValue)
  {
    
  }

  //change barcode event
  handleChangeBarcode(event)
  {
    let selectedValue = event.currentTarget.value;

    let searchBarcodeStatus = false;

    if(selectedValue && selectedValue.length == 0)
    {
      this.setState({
        amount: '',
        redeem_button_disabled: true
      });
    }

    //if barcode
    if(selectedValue)
    {
      selectedValue = selectedValue.substring(selectedValue.lastIndexOf("$") - 1, selectedValue.length);

      selectedValue = selectedValue.replace("$$", "");
      
      selectedValue = selectedValue.substring(selectedValue.length - 16, selectedValue.length);

      searchBarcodeStatus = true;

    }else{
      searchBarcodeStatus = false;
    }

    this.setState({
      barcode: selectedValue,
      serial_number: '',
    });

    if(searchBarcodeStatus && (selectedValue.length >= 16))
    {
      const reportData = {
        backoffice_session_id: this.props['session'].session.backoffice_session_id,
        jwt_token: this.props['session'].session.jwt_token,

        barcode: selectedValue
      };

      getCardCreditsService(reportData)
      .then((response) => {
        if(response.status == 'OK')
        {
          for(let player of this.state.list_players)
          {
            if(player.prepaid_code === selectedValue)
            {
              this.setState(
                {
                  serial_number: player.serial_number
                }
              );
              break;
            }
          }

          if(response.credits > 0)
          {

            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: false
              }
            );      
          }else{
            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: true
              }
            );
          }
        }else{
          this.setState(
            {
              redeem_button_disabled: true
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            redeem_button_disabled: true
          }
        );
      });
    }
    else{
      this.setState(
        {
          redeem_button_disabled: true
        }
      );
    }
  }

  handleChangeSerialNumber(event)
  {
    let selectedValue = event.currentTarget.value;

    let searchSerialNumberStatus = false;

    if(selectedValue && selectedValue.length == 0)
    {
      this.setState({
        amount: '',
        redeem_button_disabled: true
      });
    }

    if(selectedValue && (selectedValue.indexOf("$$") == -1))
    {
      searchSerialNumberStatus = true;
    }else{
      searchSerialNumberStatus = false;
    }

    this.setState({
      serial_number: selectedValue,
      barcode: '',
    });

    if(searchSerialNumberStatus && (selectedValue.length >= 6 && selectedValue.length <= 12))
    {
      const reportData = {
        backoffice_session_id: this.props['session'].session.backoffice_session_id,
        jwt_token: this.props['session'].session.jwt_token,

        serial_number: selectedValue
      };

      getCardCreditsService(reportData)
      .then((response) => {
        if(response.status == 'OK')
        {
          if(response.credits > 0)
          {
            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: false
              }
            );      
          }else{
            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: true
              }
            );
          }
        }else{
          this.setState(
            {
              redeem_button_disabled: true
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            redeem_button_disabled: true
          }
        );
      });
    }
    else{
      this.setState(
        {
          redeem_button_disabled: true
        }
      );
    }
  }

  //click on list cards table on card
  handleClickCardData(row)
  {
    const barcode = row.prepaid_code;

    const player_id = row.used_by_player_id || row.player_id_bound;

    const serial_number = row.serial_number;

    this.setState({
      barcode: barcode,
      serial_number: serial_number
    });

    if(barcode && serial_number)
    {
      const reportData = {
        backoffice_session_id: this.props['session'].session.backoffice_session_id,
        jwt_token: this.props['session'].session.jwt_token,

        barcode: barcode,
        serial_number: serial_number,
        player_id: player_id,

        affiliate_owner: this.props['session'].session.affiliate_id || '', //parent_affiliate_id
        affiliate_creator: this.props['session'].session.affiliate_id || '', //affiliate_id
        currency: this.props['session'].session.result.currency_out || '', ////
      };

      getCardCreditsService(reportData)
      .then((response) => {
        if(response.status == 'OK')
        {
          if(response.credits > 0)
          {
            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: false
              }
            );      
          }else{
            this.setState(
              {
                amount: response.credits_formatted,
                redeem_button_disabled: true
              }
            );
          }
          
        }else{
          this.setState(
            {
              redeem_button_disabled: true
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            redeem_button_disabled: true
          }
        );
      });
    }else{
      this.setState(
        {
          redeem_button_disabled: true
        }
      );
    }
  }

  //change search field to search card
  handleChangeSearchPlayer(event)
  {
    let selectedValue = event.currentTarget.value;

    if(selectedValue && selectedValue.indexOf("$$") >= 0)
    {
      selectedValue = selectedValue.replace("$$", "");
      this.refPlayerSearchField.current.value = selectedValue;
    }

    if(selectedValue && selectedValue.length > 0)
    {
      let filter_list_players = this.state.list_players.filter((row) => {
        //console.log(row);
        return ( (row.prepaid_code && row.prepaid_code.includes(selectedValue.toLowerCase())) || 
          (row.serial_number && row.serial_number.includes(selectedValue.toLowerCase())) ||
          (row.amount && row.amount.includes(selectedValue.toLowerCase())) ||
          (row.username && row.username.toLowerCase().includes(selectedValue.toLowerCase()))
        );
      });

      this.setState(
        {
          filter_list_players: filter_list_players
        }
      );
    }else{
      this.setState(
        {
          filter_list_players: this.state.list_players
        }
      );
    }
  }

  handleClickRedeemButton(event)
  {

    this.setState({
      open_redeem_dialog: true
    });

    return;
  }

  handleConfirmRedeem()
  {
    if(this.state.barcode.length > 0)
    {
      const reportData = {
        backoffice_session_id: this.props['session'].session.backoffice_session_id,
        barcode: this.state.barcode,
        credits: this.state.amount
      };
  
      resetCardCreditsService(reportData)
      .then((response) => {
  
        let statusMessage = {
          errorMessage: '',
          isErrorMessage: false,
          successMessage: '',
          isSuccessMessage: false,
        };
  
        if(response['status'] == 'OK')
        {
          statusMessage = {
            successMessage: 'Card successfully redeemed',
            isSuccessMessage: true,
            errorMessage: '',
            isErrorMessage: false,
          };
        }else{
          if(response['status_out'] == -1)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -2)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because cashier is not valid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -3)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because session is not valid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -4)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because it invalid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -5)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because player does not exist',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -6)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because it is forbidden',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else{
            statusMessage = {
              errorMessage: 'Card was not redeemed',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
        }
  
        this.loadData();
  
        this.setState(
          {
            barcode_focus: true,
            barcode: '',
            serial_number: '',
            amount: '',
            redeem_button_disabled: true,
            open_redeem_dialog: false,
            ...statusMessage
          }
        );
    
        this.refBarcodeField.current.focus();  
      })
      .catch((error) => {
        console.log(error);
  
        let statusMessage = {
          errorMessage: 'Card was not redeemed',
          isErrorMessage: true,
          successMessage: '',
          isSuccessMessage: false,
        };
  
        this.loadData();
  
        this.setState(
          {
            barcode_focus: true,
            barcode: '',
            serial_number: '',
            amount: '',
            redeem_button_disabled: true,
            open_redeem_dialog: false,
            ...statusMessage
          }
        );
    
        this.refBarcodeField.current.focus();
      });
    }else if(this.state.serial_number.length > 0)
    {
      const reportData = {
        backoffice_session_id: this.props['session'].session.backoffice_session_id,
        serial_number: this.state.serial_number,
        credits: this.state.amount
      };
  
      resetCardCreditsService(reportData)
      .then((response) => {
  
        let statusMessage = {
          errorMessage: '',
          isErrorMessage: false,
          successMessage: '',
          isSuccessMessage: false,
        };
  
        if(response['status'] == 'OK')
        {
          statusMessage = {
            successMessage: 'Card successfully redeemed',
            isSuccessMessage: true,
            errorMessage: '',
            isErrorMessage: false,
          };
        }else{
          if(response['status_out'] == -1)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -2)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because cashier is not valid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -3)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because session is not valid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -4)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because it invalid',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -5)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because player does not exist',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else if(response['status_out'] == -6)
          {
            statusMessage = {
              errorMessage: 'Card was not redeemed because it is forbidden',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
          else{
            statusMessage = {
              errorMessage: 'Card was not redeemed',
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,
            };
          }
        }
  
        this.loadData();
  
        this.setState(
          {
            serial_number_focus: true,
            barcode: '',
            serial_number: '',
            amount: '',
            redeem_button_disabled: true,
            open_redeem_dialog: false,
            ...statusMessage
          }
        );
    
        this.refSerialNumberField.current.focus();  
      })
      .catch((error) => {
        console.log(error);
  
        let statusMessage = {
          errorMessage: 'Card was not redeemed',
          isErrorMessage: true,
          successMessage: '',
          isSuccessMessage: false,
        };
  
        this.loadData();
  
        this.setState(
          {
            serial_number_focus: true,
            barcode: '',
            serial_number: '',
            amount: '',
            redeem_button_disabled: true,
            open_redeem_dialog: false,
            ...statusMessage
          }
        );
    
        this.refSerialNumberField.current.focus();
      });
    } 
  }

  handleCancelRedeem()
  {
    this.setState({
      open_redeem_dialog: false
    });
  }

  handleClickClear(event)
  {
    this.setState(
      {
        barcode_focus: true,
        barcode: '',
        serial_number: '',
        amount: '',
        redeem_button_disabled: true,
        open_redeem_dialog: false,

        errorMessage: '',
        isErrorMessage: false,
        successMessage: '',
        isSuccessMessage: false,
      }
    );

    this.refBarcodeField.current.focus();
  }

  render() {
    return (
      <div className={this.props['classes']['content']}>            
        <Grid container spacing={24}>
                        
          { 
            this.state.isErrorMessage &&
            <Grid item xs={12} sm={12}>
              <FormHelperText 
              error={this.state.isErrorMessage} 
              variant={'filled'}
              className={classNames(this.props['classes']['errorMessage'])}
              >
                {this.state.errorMessage}
              </FormHelperText>
            </Grid>
          }

          { 
            this.state.isSuccessMessage &&
            <Grid item xs={12} sm={12}>
              <FormHelperText 
              variant={'filled'}
              className={classNames(this.props['classes']['successMessage'])}
              >
                {this.state.successMessage}
              </FormHelperText>
            </Grid>  
          }

          { (!this.state.isErrorMessage && !this.state.isSuccessMessage) &&
            <Grid item xs={12} sm={12}>
            &nbsp;
            </Grid>  
          }

          {
            this.state.open_redeem_dialog && 
            <ConfirmRedeemDialog cancelRedeemFn={this.handleCancelRedeem} confirmRedeemFn={this.handleConfirmRedeem} />
          }

          <Grid item xs={6} sm={6}>
            <TextField
              name="barcode"
              label={<FormattedMessage id="Barcode" defaultMessage="Barcode" />}
              fullWidth
              variant="outlined"
              type="password"
              autoFocus={this.state.barcode_focus}
              value={this.state.barcode}
              onChange={this.handleChangeBarcode}
              inputRef={this.refBarcodeField}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <TextField
              name="serial_number"
              label={<FormattedMessage id="Serial Number" defaultMessage="Serial Number" />}
              fullWidth
              variant="outlined"
              autoFocus={this.state.serial_number_focus}
              value={this.state.serial_number}
              onChange={this.handleChangeSerialNumber}
              inputRef={this.refSerialNumberField}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <TextField
              name="amount"
              label={<FormattedMessage id="Amount" defaultMessage="Amount" />}
              fullWidth
              variant="outlined"
              disabled
              value={this.state.amount}
            />
          </Grid>

          <Grid item xs={2} sm={2}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              disabled={this.state.redeem_button_disabled}
              onClick={this.handleClickRedeemButton}
            >
              <FormattedMessage id="Redeem" defaultMessage="Redeem" />
            </Button>
          </Grid>

          <Grid item xs={2} sm={2}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              color="default"
              onClick={this.handleClickClear}
            >
              <FormattedMessage id="Clear" defaultMessage="Clear" />
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              name="search_player"
              label={<FormattedMessage id="Search" defaultMessage="Search" />}
              fullWidth
              variant="outlined"
              inputRef={this.refPlayerSearchField}
              onChange={this.handleChangeSearchPlayer}
            />
            
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <div className={classNames(this.props['classes']['cardContentList'])}>
                  <section className={"infoHeader"}>
                    <div className={"cell part2"}>
                      <div className={"flexCell prioritiesHolder"}>                      
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 300 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Voucher Code" defaultMessage="Voucher Code" />
                          </span>
                        </div>
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 300 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Serial Number" defaultMessage="Serial Number" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className={classNames(this.props['classes']['vb'])}>
                    <div className={classNames(this.props['classes']['cardContent'], this.props['classes']['hideScrollbar'])}>

                    {
                      (!this.state.filter_list_players) &&
                      <div className={"cardContentRow default"}>
                        <div className={"part2wrapperV2"}  style={{maxWidth: 600}}>
                          <div className={"break-lines partvar"} style={{ paddingLeft: 290 }}>
                            <CircularProgress size={36} thickness={4} variant="indeterminate" />
                          </div>
                        </div>
                      </div>
                    }

                    {
                      (this.state.filter_list_players && this.state.filter_list_players.length === 0) &&
                      <div className={"cardContentRow default"}>
                        <div className={"part2wrapperV2"}  style={{maxWidth: 600}}>
                          <div className={"break-lines partvar"} style={{ paddingLeft: 290 }}>
                            <FormattedMessage id="No Records" defaultMessage="No Records" />
                          </div>
                        </div>
                      </div>
                    }

                    {
                      this.state.filter_list_players &&
                      this.state.filter_list_players
                      .map((row, index) => {
                        return(
                          <div className={"cardContentRow default"} key={index}>
                            <div className={"part2"} onClick={ () => this.handleClickCardData(row) }>
                              
                              <div className={"part2wrapperV2"}  style={{maxWidth: 300}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.prepaid_code.replace(row.prepaid_code.substring(0, 9), '*********') }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 300}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.serial_number }</span>
                                </div>
                              </div>

                            </div>  
                          </div>
                        );
                      })
                    }
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const session = state.session;

  return { 
    session
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveLoginAction,
    validateSessionAction
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(Redeem);

export default withStyles(RedeemStyle)(injectIntl(hoc));