import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrintMemberCardStyle from "./PrintMemberCardStyle";
import classNames from 'classnames';
import { DEBUG_CONSOLE, REST_SERVICE_BASE_URL } from '../../configuration/Config';
import { saveLoginAction } from '../../redux/actions/session/SessionActions';
import DateTimeHelper from '../../helpers/DateTimeHelper';
import Button from '@material-ui/core/Button';

import ReactToPrint from 'react-to-print';
import MemberCardBarcodeToPrint from '../../components/CreateMemberCard/MemberCardBarcodeToPrint/MemberCardBarcodeToPrint';
import MemberCardQRCodeToPrint from '../../components/CreateMemberCard/MemberCardQRCodeToPrint/MemberCardQRCodeToPrint';

import {
  searchListVouchersService
} 
  from "../../redux/services/administration/vouchers/VouchersService";

class PrintMemberCard extends React.Component {

  classes = null;

  refPlayerSearchField = null;

  refBarcodeCard = null;

  refQrCodeCard = null;

  state = {
    select_player: '',
    select_amount: 10,

    errorMessage: '',
    isErrorMessage: false,
    successMessage: '',
    isSuccessMessage: false,

    start_serial_number: '',
    end_serial_number: '',

    game_client_qr_code_url: { value: 'http://www.example.com', label: 'WWW.EXAMPLE.COM - HTTP' },

    select_player_focus_field_status: true,

    list_players: [],
    filter_list_players: [],

    //card to print information
    card_prepaid_code: '',
    card_serial_number: '',
    card_amount: '',
    card_currency: '',
    card_expiry_date: '',

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

    this.handleChangePlayer = this.handleChangePlayer.bind(this);

    this.handleClickCardData = this.handleClickCardData.bind(this);

    this.handleChangeSearchPlayer = this.handleChangeSearchPlayer.bind(this);

    this.refPlayerSearchField = React.createRef();

    this.refBarcodeCard = React.createRef();

    this.refQrCodeCard = React.createRef();
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
      console.log("Vouchers \ Create Member Card :: loadData");
      console.log(this.props['session']);
    }

    const reportData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id,
      jwt_token: this.props['session'].session.jwt_token,

      page_number: 1,
      per_page: 1000,
      serial_number: '',
      affiliate_owner: '',
      affiliate_creator: '', ///this.props['session'].session.affiliate_id
      used_by_player: '',
      player_id_bound: '',
      activation_date: '',
      amount: '',
      prepaid_code: '',
      currency: '', ////this.props['session'].session.result.currency_out,
      promo_card: 'REAL MONEY', ////
      status: '', ///U
      created_date: '',
      date_of_use: '',
      username: '',
      refill_status: '',
      expire_before: '',
      expire_after: DateTimeHelper.getFormattedDateFromDatePickerVouchers(new Date()),
    };

    searchListVouchersService(reportData)
    .then((response) => {
      this.setState(
        {
          list_players: response,
          filter_list_players: response,
        }
      )
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleChangeAmount(event, newValue)
  {
    
  }

  handleChangePlayer(event)
  {
    let selectedValue = event.currentTarget.value;

    if(selectedValue && selectedValue.indexOf("$$") >= 0)
    {
      selectedValue = selectedValue.substring(selectedValue.lastIndexOf("$") - 1, selectedValue.length);
    }


    if(selectedValue && selectedValue.indexOf("$$") == 0)
    {
      selectedValue = selectedValue.replace("$$", "");
    }

    if(selectedValue)
    {
      selectedValue = selectedValue.replace(/\D/g,'');
      selectedValue = selectedValue.substring(selectedValue.length - 16, selectedValue.length);
    }

    this.setState({
      select_player: selectedValue
    });
  }

  handleClickCardData(row)
  {
    this.setState({
      select_player: row.prepaid_code,
      card_prepaid_code: row.prepaid_code,
      card_serial_number: row.serial_number,
      card_amount: row.amount,
      card_currency: row.currency,
      card_expiry_date: row.expiry_date,
    });
  }

  handleChangeSearchPlayer(event)
  {
    let selectedValue = event.currentTarget.value;

    if(selectedValue && selectedValue > 0)
    {
      let filter_list_players = this.state.list_players.filter((row) => {
        return row.prepaid_code.includes(selectedValue.toLowerCase()) || row.serial_number.includes(selectedValue.toLowerCase());
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

          <Grid item xs={12} sm={12}>
                        
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Grid container spacing={24}>
                  {
                    this.state.card_prepaid_code.length > 0 &&
                    <Grid item xs={6} sm={6}>
                      <MemberCardBarcodeToPrint
                      ref={ this.refBarcodeCard }
                      card_amount={this.state.card_amount} 
                      card_currency={this.state.card_currency} 
                      card_expiry_date={this.state.card_expiry_date}
                      card_prepaid_code={ "$$" + this.state.card_prepaid_code} 
                      card_serial_number={this.state.card_serial_number} 
                      />
                    </Grid>
                  }

                  {
                    this.state.card_prepaid_code.length > 0 &&
                    <Grid item xs={3} sm={3}>
                      <ReactToPrint
                        trigger={ () => {
                          return(
                            <Button
                              type="button"                           
                              variant="contained"
                              size="large"
                              color="primary"
                              className={this.props['classes']['submit']}>
                              <FormattedMessage id="Print Barcode" defaultMessage="Print Barcode" />
                            </Button>
                          );
                        } }
                        content={ () => {
                          return this.refBarcodeCard.current;
                        } }
                      />
                    </Grid>
                  }

                  {
                    this.state.card_prepaid_code.length > 0 &&
                    <Grid item xs={6} sm={6}>
                      <MemberCardQRCodeToPrint
                      ref={ this.refQrCodeCard }
                      card_amount={this.state.card_amount} 
                      card_currency={this.state.card_currency} 
                      card_expiry_date={this.state.card_expiry_date}
                      card_prepaid_code={this.state.card_prepaid_code} 
                      card_serial_number={this.state.card_serial_number} 
                      />
                    </Grid>
                  }

                  {
                    this.state.card_prepaid_code.length > 0 &&
                    <Grid item xs={3} sm={3}>
                      <ReactToPrint
                        trigger={ () => {
                          return(
                            <Button
                              type="button"                           
                              variant="contained"
                              size="large"
                              color="primary"
                              className={this.props['classes']['submit']}>
                              <FormattedMessage id="Print QR" defaultMessage="Print QR" />
                            </Button>
                          );
                        } }
                        content={ () => {
                          return this.refQrCodeCard.current;
                        } }
                      />
                    </Grid>
                  }
                </Grid>  
              </Grid>
              <Grid item xs={6} sm={6} style={{ maxWidth: 900 }}>
                  <TextField
                  name="search_player"
                  label={<FormattedMessage id="Search" defaultMessage="Search" />}
                  fullWidth
                  variant="outlined"
                  inputRef={this.refPlayerSearchField}
                  onChange={this.handleChangeSearchPlayer}
                />
                <div className={classNames(this.props['classes']['cardContentList'])}>
                  <section className={"infoHeader"}>
                    <div className={"cell part2"}>
                      <div className={"flexCell prioritiesHolder"}>                      
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 250 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Voucher Code" defaultMessage="Voucher Code" />
                          </span>
                        </div>
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 150 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Serial Number" defaultMessage="Serial Number" />
                          </span>
                        </div>
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 100 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Amount" defaultMessage="Amount" />
                          </span>
                        </div>
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 100 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Currency" defaultMessage="Currency" />
                          </span>
                        </div>  
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 150 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Create Date" defaultMessage="Create Date" />
                          </span>
                        </div> 
                        <div className={"flex1Cell subcell"} style={ { maxWidth: 150 } }>
                          <span className={"name"}>
                            <FormattedMessage id="Expiry Date" defaultMessage="Expiry Date" />
                          </span>
                        </div> 

                      </div>
                    </div>
                  </section>

                  <div className={classNames(this.props['classes']['vb'])}>
                    <div className={classNames(this.props['classes']['cardContent'], this.props['classes']['hideScrollbar'])}>
                    {
                      this.state.filter_list_players &&
                      this.state.filter_list_players
                      .map((row, index) => {
                        return(
                          <div className={"cardContentRow default"} key={index}>
                            <div className={"part2"} onClick={ () => this.handleClickCardData(row) }>
                              
                              <div className={"part2wrapperV2"}  style={{maxWidth: 250}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.prepaid_code }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 150}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.serial_number }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 100}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.amount }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 100}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.currency }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 150}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.creation_date }</span>
                                </div>
                              </div>

                              <div className={"part2wrapperV2"} style={{maxWidth: 150}}>
                                <div className={"break-lines partvar-left"}>
                                  <span>{ row.expiry_date }</span>
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
    saveLoginAction
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(PrintMemberCard);

export default withStyles(PrintMemberCardStyle)(injectIntl(hoc));