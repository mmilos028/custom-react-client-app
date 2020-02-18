import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CashierReportStyle from "./CashierReportStyle";
import classNames from 'classnames';
import { DEBUG_CONSOLE, REST_SERVICE_BASE_URL } from '../../configuration/Config';
import { saveLoginAction } from '../../redux/actions/session/SessionActions';
import Button from '@material-ui/core/Button';

import { listCashierServiceReportService, resetCounterForLevelService } from '../../redux/services/CashierService';

import {
  validateSessionAction
} from '../../redux/actions/session/SessionActions';

import { IS_DESKTOP_APPLICATION } from '../../configuration/Config';

import DateTimeHelper from '../../helpers/DateTimeHelper';

class CashierReport extends React.Component {

  classes = null;

  state = {
    
    errorMessage: '',
    isErrorMessage: false,
    successMessage: '',
    isSuccessMessage: false,

    last_clear_time: '/',
    last_clear_result: '/',
    result: '/',

    subject_id: '',
    counter_level: '',
    cash_box: '',
    deposit: '',
    withdraw: '',
    cash_box_start: '',
    amount_collected: '',
    note: '',
    currency: '',

    clear_button_disabled: true
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
    
    this.onClearButtonClick = this.onClearButtonClick.bind(this);
    
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
      affiliate_id: this.props['session'].session.affiliate_id
    };

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

      listCashierServiceReportService(reportData)
      .then((response) => {
        if(response.status === 'OK'){
          if(DEBUG_CONSOLE){
            console.log(response);
          }

          let last_clear_time = '/';
          let last_clear_result = '/';
          let result = '/';
          if(response.report[0] != null)
          {
            last_clear_time = response.report[0]['date_time'];
            last_clear_result = response.report[0]['last_clear_result_formatted'];
            result = response.report[0]['cashier_result_formatted'];

            this.setState(
              {
                errorMessage: '',
                isErrorMessage: false,
                successMessage: '',
                isSuccessMessage: false,

                last_clear_time: last_clear_time,
                last_clear_result: last_clear_result,
                result: result,

                subject_id: response.report[0]['subject_id'],
                counter_level: response.report[0]['counter_level'],
                cash_box: response.report[0]['cash_box'],
                deposit: response.report[0]['deposit'],
                withdraw: response.report[0]['withdraw'],
                cash_box_start: response.report[0]['cash_box_start'],
                amount_collected: response.report[0]['amount_collected'],
                note: response.report[0]['note'],
                currency: response.report[0]['currency'],

                clear_button_disabled: false
              }          
            );
          }else
          {
            this.setState(
              {    
                errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
                isErrorMessage: true,
                successMessage: '',
                isSuccessMessage: false,

                clear_button_disabled: true
              }
            );
          }
          
        }else{
          this.setState(
            {    
              errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
              isErrorMessage: true,
              successMessage: '',
              isSuccessMessage: false,

              clear_button_disabled: true
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
        amount_on_card: newValue
      }
    );
  }

  onClearButtonClick(evt)
  {
    if(DEBUG_CONSOLE){
      console.log("Create Member Card :: onCreateButtonClick");
      console.log(this.state);
    }

    let cash_box_end = (+this.state.cash_box) - (+this.state.amount_collected);

    const reportData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id,
      jwt_token: this.props['session'].session.jwt_token,
      
      affiliate_id: this.props['session'].session.affiliate_id,
      reset_done_by_id: this.props['session'].session.affiliate_id,

      subject_id: this.state.subject_id,
      counter_level: this.state.counter_level,
      cash_box_start: this.state.cash_box_start,
      cash_box_end: cash_box_end,
      amount_collected: this.state.amount_collected,
      deposit: this.state.deposit,
      withdraw: this.state.withdraw,
      note: this.state.note,
      currency: this.state.currency
    };

    resetCounterForLevelService(reportData)
    .then((response) => {
      if(response.status === 'OK'){
        if(DEBUG_CONSOLE){
          console.log(response);
        }

        this.loadData();

        this.setState(
          {
            errorMessage: '',
            isErrorMessage: false,
            successMessage: <FormattedMessage id="Changes saved" defaultMessage="Changes saved" />,
            isSuccessMessage: true
          }
        );
        
      }else{
        this.setState(
          {    
            errorMessage: <FormattedMessage id="Error please try again" defaultMessage="Error please try again" />,
            isErrorMessage: true,
            successMessage: '',
            isSuccessMessage: false
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
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

              <Grid item xs={4} sm={4}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignLeft'])}>
                  <FormattedMessage id="Last clear time" defaultMessage="Last clear time" />:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignLeft'])}>
                { DateTimeHelper.getUSFormattedDateAndTime(this.state.last_clear_time) }
                </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignLeft'])}>
                  <FormattedMessage id="Last clear result" defaultMessage="Last clear result" />:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignLeft'])}>
                  { this.state.last_clear_result }
                </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignRight'], this.props['classes']['textUppercase'])}>
                  <FormattedMessage id="Result" defaultMessage="Result" />:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography variant="h5" className={classNames(this.props['classes']['textAlignLeft'])}>
                { this.state.result }
                </Typography>
              </Grid>
          
              <Grid item xs={12} sm={12} className={classNames(this.props['classes']['textAlignCenter'])}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={this.props['classes']['submit']}
                  onClick={this.onClearButtonClick}
                  disabled={this.state.clear_button_disabled}
                >
                  <FormattedMessage id="Clear" defaultMessage="Clear" />
                </Button>
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(CashierReport);

export default withStyles(CashierReportStyle)(injectIntl(hoc));