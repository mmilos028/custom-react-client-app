import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateMemberCardStyle from "./CreateMemberCardStyle";
import classNames from 'classnames';
import { DEBUG_CONSOLE, REST_SERVICE_BASE_URL } from '../../configuration/Config';
import { saveLoginAction } from '../../redux/actions/session/SessionActions';
import Button from '@material-ui/core/Button';

import ReactToPrint from 'react-to-print';
import MemberCardBarcodeToPrint from './MemberCardBarcodeToPrint/MemberCardBarcodeToPrint';
import MemberCardBarcodeToPrintInBrowser from './MemberCardBarcodeToPrint/MemberCardBarcodeToPrintInBrowser';
//import MemberCardQRCodeToPrint from './MemberCardQRCodeToPrint/MemberCardQRCodeToPrint';

import {
  createMemberCardService,
  getCreateMemberCardConfigService,
  listCardInformationsService
} 
  from "../../redux/services/administration/vouchers/VouchersService"; 

import { IS_DESKTOP_APPLICATION } from '../../configuration/Config';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import {
  validateSessionAction
} from '../../redux/actions/session/SessionActions';

class CreateMemberCard extends React.Component {

  classes = null;
  
  loginData = null;

  refCard = null;

  state = {
    
    //validation messages
    errorMessage: '',
    isErrorMessage: false,
    successMessage: '',
    isSuccessMessage: false,

    //created cards serial numbers
    start_serial_number: '',
    end_serial_number: '',

    //card to create information
    generated_pdf_url: '',

    barcode_type: 'C128',

    number_of_cards: 1,
    amount_on_card: '',
    promo_card: 'REAL MONEY',
    currency: this.props['session']['session']['result']['currency_out'] || '',
    affiliate_id: this.props['session']['session']['parent_affiliate_id'] || '',  //parent_affiliate_id
    affiliate_name: this.props['session']['session']['username'],
    expired_date: '',
    number_of_days: 30,
    activated_card: 'Y',
    card_type: 'member',
    username: '',
    password_type: 'N',
    refill_allowed: 'N',
    deactivate_after_spent: '-1',

    //card to print information
    card_prepaid_code: '',
    card_serial_number: '',
    card_amount: '',
    card_currency: '',
    card_expiry_date: '',

    print_member_card_button_disabled: true,

    show_prepaid_card_image: false,
    show_prepaid_card_print_button: false
  };

  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,
    saveLoginAction: PropTypes.func.isRequired
  }

  constructor(props, context)
  {
    super(props, context);

    this.classes = props.classes;
    
    this.onNativePrintMemberCardButtonClick = this.onNativePrintMemberCardButtonClick.bind(this);

    this.handleChangeAmount = this.handleChangeAmount.bind(this);

    this.refCard = React.createRef();
  }

  componentDidMount()
  {
    const loginData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id,      
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

        this.setState({
          currency: this.props['session'].session.result.currency_out
        });

        getCreateMemberCardConfigService()
        .then((response) => {
          if(response.status === 'OK'){
            if(DEBUG_CONSOLE){
              console.log(response);
            }
            this.setState(
              {
                barcode_type: response.barcode_type || 'C128',

                number_of_cards: response.number_of_cards || 1,
                amount_on_card: response.amount_on_card || '',
                promo_card: response.promo_card || 'REAL MONEY',            
                expired_date: response.expired_date || '',
                number_of_days: response.number_of_days || 30,
                activated_card: response.activated_card || 'Y',
                card_type: response.card_type || 'member',
                username: response.username || '',
                password_type: response.password_type || 'N',
                refill_allowed: response.refill_allowed || 'N',
                deactivate_after_spent: response.deactivate_after_spent || '-1',

                card_expiry_date: response.number_of_days || 30,
              }
            );
          }
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

  handleChangeAmount(event, newValue)
  {
    this.setState(
      {
        amount_on_card: newValue,
        print_member_card_button_disabled: ((newValue) ? false : true)
      }
    );
  }

  onNativePrintMemberCardButtonClick(event)
  {
    if(DEBUG_CONSOLE){
      console.log("Create Member Card :: onNativePrintMemberCardButtonClick");
      console.log(this.state);
    }

    const loginData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id,      
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

        const newMemberCard = {
          backoffice_session_id: this.props['session'].session.backoffice_session_id,
          jwt_token: this.props['session'].session.jwt_token,
          no_cards: this.state.number_of_cards,
          amount: this.state.amount_on_card,
          promo: this.state.promo_card,
          currency: this.state.currency,
          affiliate_id: this.state.affiliate_id,
          affiliate_name: this.state.affiliate_name,
          expire_date: this.state.expired_date,
          no_of_days: this.state.number_of_days,
          activate: this.state.activated_card,
          member_card: this.state.card_type == 'member' ? 'Y' : 'N',
          username: this.state.username,
          pass: this.state.password_type,
          refill_allowed: this.state.refill_allowed,
          deactivate_after_spent: this.state.deactivate_after_spent,
        };
        
        createMemberCardService(newMemberCard)
        .then((response) => {
          if(response.status === 'OK'){
            if(DEBUG_CONSOLE){
              console.log(response);
            }

            const serialNumberStart = response.serial_number_start;
            const serialNumberEnd = response.serial_number_end;
            
            const reportData = {
              backoffice_session_id: this.props['session'].session.backoffice_session_id,
              serial_number_start: serialNumberStart,
              serial_number_end: serialNumberEnd          
            }

            listCardInformationsService(reportData)
            .then((response) => {
              if(response.status === 'OK')
              {
                const cardInformation = response.report[0];
            
                this.setState(
                  {
                    errorMessage: '',
                    isErrorMessage: false,
                    successMessage: ( this.props['intl'].formatMessage({ id:"Card created successfully", defaultMessage: "Card created successfully"})),
                    isSuccessMessage: true,

                    card_prepaid_code: "$$" + cardInformation.prepaid_code,
                    card_serial_number: cardInformation.serial_number,
                    card_amount: cardInformation.amount,
                    card_currency: cardInformation.currency,
                    card_expiry_date: "30 DAYS",

                    start_serial_number: response.serial_number_start,
                    end_serial_number: response.serial_number_end,
                    amount_on_card: '',
                    print_member_card_button_disabled: true,
                    show_prepaid_card_image: true,
                    show_prepaid_card_print_button: true
                  }
                );

              }else{
                this.setState(
                  {    
                    errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
                    isErrorMessage: true,
                    successMessage: '',
                    isSuccessMessage: false,
          
                    start_serial_number: '',
                    end_serial_number: '',
                    amount_on_card: '',
                    print_member_card_button_disabled: true,
                    show_prepaid_card_image: false,
                    show_prepaid_card_print_button: false
                  }
                );
              }
            }).catch((error) => {
              console.log(error);
              this.setState(
                {    
                  errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
                  isErrorMessage: true,
                  successMessage: '',
                  isSuccessMessage: false,
        
                  start_serial_number: '',
                  end_serial_number: '',
                  amount_on_card: '',
                  print_member_card_button_disabled: true,
                  show_prepaid_card_image: false,
                  show_prepaid_card_print_button: false  
                }
              );
            });        
          }else{
            this.setState(
              {    
                errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
                isErrorMessage: true,
                successMessage: '',
                isSuccessMessage: false,

                start_serial_number: '',
                end_serial_number: '',
                amount_on_card: '',
                print_member_card_button_disabled: true,
                show_prepaid_card_image: false,
                show_prepaid_card_print_button: false
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState(
            {    
              errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,

              start_serial_number: '',
              end_serial_number: '',
              amount_on_card: '',
              print_member_card_button_disabled: true,
              show_prepaid_card_image: false,
              show_prepaid_card_print_button: false
            }
          );
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

  render() {
    return (
        <div className={this.props['classes']['content']}>            
            <Grid container spacing={24}>

              <Grid item xs={12} sm={12}>
                <Typography variant="h6" gutterBottom className={classNames(this.props['classes']['mainMessage'])}>
                  <FormattedMessage id="Please Choose Amount To Donate" defaultMessage="Please Choose Amount To Donate" />
                </Typography>
              </Grid>
                            
              <Grid item xs={12} sm={12}>
                <ToggleButtonGroup className={classNames(this.props['classes']['toggleButtonGroup'])} 
                exclusive={true} 
                value={this.state.amount_on_card} onChange={this.handleChangeAmount} color="inherit" 
                >
                  <ToggleButton key={10} className={ classNames((this.state.amount_on_card && this.state.amount_on_card == '10') ? this.props['classes']['toggleButtonSelected'] : this.props['classes']['toggleButton']) } value={'10'}>
                    <Typography variant="h3" className={classNames(this.props['classes']['toggleButtonText'])}>
                      {this.state.currency ==='USD' && '$' }
                      {this.state.currency ==='EUR' && '€' }
                      {this.state.currency ==='GBP' && '£' }
                      10
                    </Typography>
                  </ToggleButton>
                  <ToggleButton key={20} className={classNames( (this.state.amount_on_card && this.state.amount_on_card === '20') ? this.props['classes']['toggleButtonSelected'] : this.props['classes']['toggleButton'] )} value={'20'}>
                    <Typography variant="h3" className={classNames(this.props['classes']['toggleButtonText'])}>
                      {this.state.currency ==='USD' && '$' }
                      {this.state.currency ==='EUR' && '€' }
                      {this.state.currency ==='GBP' && '£' }
                      20
                    </Typography>
                  </ToggleButton>
                  <ToggleButton key={50} className={classNames( (this.state.amount_on_card && this.state.amount_on_card === '50') ? this.props['classes']['toggleButtonSelected'] : this.props['classes']['toggleButton'] )} value={'50'}>
                    <Typography variant="h3" className={classNames(this.props['classes']['toggleButtonText'])}>  
                      {this.state.currency ==='USD' && '$' }
                      {this.state.currency ==='EUR' && '€' }
                      {this.state.currency ==='GBP' && '£' }
                      50
                    </Typography>
                  </ToggleButton>
                  <ToggleButton key={100} className={ classNames( (this.state.amount_on_card && this.state.amount_on_card === '100') ? this.props['classes']['toggleButtonSelected'] : this.props['classes']['toggleButton']) } value={'100'}>
                    <Typography variant="h3" className={classNames(this.props['classes']['toggleButtonText'])}>
                      {this.state.currency ==='USD' && '$' }
                      {this.state.currency ==='EUR' && '€' }
                      {this.state.currency ==='GBP' && '£' }
                      100
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  size="large"
                  color="primary"
                  className={this.props['classes']['submit']}
                  onClick={this.onNativePrintMemberCardButtonClick}
                  disabled={this.state.print_member_card_button_disabled}>
                  <FormattedMessage id="Create Member Card" defaultMessage="Create Member Card" />
                </Button>                                  
              </Grid>

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
           
              {
                this.state.card_prepaid_code.length > 0 && this.state.show_prepaid_card_image &&
                <Grid item xs={6} sm={6}>
                  <MemberCardBarcodeToPrintInBrowser
                    card_amount={this.state.card_amount} 
                    card_currency={this.state.card_currency} 
                    card_expiry_date={this.state.card_expiry_date}
                    card_prepaid_code={this.state.card_prepaid_code} 
                    card_serial_number={this.state.card_serial_number} 
                  />
                  <div style={{ display: 'none' }}>
                    <MemberCardBarcodeToPrint
                    ref={ this.refCard }
                    card_amount={this.state.card_amount} 
                    card_currency={this.state.card_currency} 
                    card_expiry_date={this.state.card_expiry_date}
                    card_prepaid_code={this.state.card_prepaid_code} 
                    card_serial_number={this.state.card_serial_number} 
                    />
                  </div>
                </Grid>
              }

              {
                this.state.card_prepaid_code.length > 0 && this.state.show_prepaid_card_print_button &&
                <Grid item xs={6} sm={6}>
                  <ReactToPrint
                    removeAfterPrint={false}
                    trigger={ () => {
                      return(
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          size="large"
                          color="primary"
                          className={this.props['classes']['submit']}>
                          <FormattedMessage id="Print Member Card" defaultMessage="Print Member Card" />
                        </Button>
                      );
                    } }
                    content={ () => {
                      return this.refCard.current;
                    } }
                    onAfterPrint={
                      () => {
                        this.setState(
                          {
                            errorMessage: '',
                            isErrorMessage: false,
                            successMessage: (this.props['intl'].formatMessage({ id:"Card printed", defaultMessage: "Card printed"})),
                            isSuccessMessage: true,
                            show_prepaid_card_image: false,
                            show_prepaid_card_print_button: false  
                          }
                        );
                      }
                    }
                    onPrintError={
                      (errorLocation, error) => {
                        this.setState(
                          {
                            errorMessage: (this.props['intl'].formatMessage({ id:"Card not printed", defaultMessage: "Card not printed"})),
                            isErrorMessage: true,
                            successMessage: '',
                            isSuccessMessage: false,
                            show_prepaid_card_image: true,
                            show_prepaid_card_print_button: true
                          }
                        );
                      }
                    }
                  />
                </Grid>
              }
                
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(CreateMemberCard);

export default withStyles(CreateMemberCardStyle)(injectIntl(hoc));