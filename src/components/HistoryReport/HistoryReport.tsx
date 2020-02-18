import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryReportStyle from "./HistoryReportStyle";
import { DEBUG_CONSOLE, REST_SERVICE_BASE_URL } from '../../configuration/Config';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
  listReportAction,
  listReportFulfilledStatusAction, 
  listReportPendingStatusAction, 
  listReportRejectedStatusAction 
} from "../../redux/actions/report/ReportActions";

import {
  validateSessionAction
} from '../../redux/actions/session/SessionActions';

import {
  listCashierHistoryReportService
} from "../../redux/services/ReportService";

import { IS_DESKTOP_APPLICATION } from '../../configuration/Config';

import DateTimeHelper from '../../helpers/DateTimeHelper';

class HistoryReport extends React.Component {

  classes = null;

  state = {

    page: 1,
    rowsPerPage: 10,
    tableData: null,
    
    errorMessage: '',
    isErrorMessage: false,
    successMessage: '',
    isSuccessMessage: false,
    
  };

  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,

    list_report_pending_status: PropTypes.bool,
    list_report_fulfilled_status: PropTypes.bool,
    list_report_rejected_status: PropTypes.bool,

    listReportAction: PropTypes.func.isRequired,
    listReportPendingStatusAction: PropTypes.func.isRequired,
    listReportFulfilledStatusAction: PropTypes.func.isRequired,
    listReportRejectedStatusAction: PropTypes.func.isRequired,
    report: PropTypes.object,
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
    if(DEBUG_CONSOLE)
    {
      console.log("HistoryReport :: loadData");
      console.log(this.props['session']);
    }

    const loginData = {
      backoffice_session_id: this.props['session'].session.backoffice_session_id,
      jwt_token: this.props['session'].session.jwt_token,
      affiliate_id: this.props['session'].session.parent_affiliate_id,
      cashier_id: this.props['session'].session.affiliate_id
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


        this.props['listReportPendingStatusAction'](loginData);
    
        this.props['listReportAction'](loginData, listCashierHistoryReportService)
        .then((response) => {
            this.props['listReportFulfilledStatusAction'](response.value.report);

            this.setState(
              {
                tableData: response.value.report
              }
            );
        })
        .catch((error) => {
            console.log(error);
            this.props['listReportRejectedStatusAction'](loginData);
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

  onClearButtonClick(evt)
  {
    if(DEBUG_CONSOLE){
      console.log("HistoryReport :: onClearButtonClick");
      //console.log(evt);
      console.log(this.state);
    }    
  }

  render() {
    return (
        <div className={this.props['classes']['content']}>            
            <Grid container spacing={24}>

              <Grid item xs={12} sm={12}>
                
                <Table className={this.classes.table} aria-labelledby="History">
                  <TableHead>
                    <TableRow>

                      <TableCell component="th" scope="row" padding="none" key={"th_serial_number"}
                      >
                        <div style={{textAlign: 'left', width: 130, color: '#000000', fontWeight: 'bold', fontSize: 18 }}>
                          <FormattedMessage id="Serial Number" defaultMessage="Serial Number" />
                        </div>
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none" key={"th_amount"}
                      >
                        <div style={{textAlign: 'right', width: 150, color: '#000000', fontWeight: 'bold', fontSize: 18 }}>
                          <FormattedMessage id="Amount" defaultMessage="Amount" />
                        </div>

                      </TableCell>

                      <TableCell component="th" scope="row" padding="none" key={"th_transaction_type"}
                      >
                        <div style={{textAlign: 'left', width: 120, color: '#000000', fontWeight: 'bold', fontSize: 18 }}>
                          <FormattedMessage id="Type" defaultMessage="Type" />
                        </div>
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none" key={"th_date_time"}
                      >
                        <div style={{textAlign: 'center', width: 150, color: '#000000', fontWeight: 'bold', fontSize: 18 }}>
                          <FormattedMessage id="Date / Time" defaultMessage="Date / Time" />
                        </div>
                      </TableCell>

                    </TableRow>
                  </TableHead>

                  <TableBody>
                  {
                    (!this.state.tableData) &&
                    <TableRow>
                      <TableCell component="td" scope="row" padding="none" style={{ textAlign: 'center' }} colSpan={4}>
                        <CircularProgress size={36} thickness={4} variant="indeterminate" />
                      </TableCell>
                    </TableRow>
                  }
                  {
                    (this.state.tableData && this.state.tableData.length === 0) &&
                    <TableRow>
                      <TableCell component="td" scope="row" padding="none" style={{ textAlign: 'center' }} colSpan={4}>
                        <span style={{ textTransform: 'uppercase', fontSize: 18 }}>
                          <FormattedMessage id="No Records" defaultMessage="No Records" />
                        </span>
                      </TableCell>
                    </TableRow>
                  }
                  { 
                    this.state.tableData && 
                    this.state.tableData
                    .map((row, index) => {
                      return (
                        <TableRow key={"row_" + index}>
                          <TableCell component="td" scope="row" padding="none" key={"serial_number" + index}>
                            <div style={{textAlign: 'left', width: 130, color: '#000000', fontSize: 16 }}>
                              { row.serial_number }
                            </div>
                          </TableCell>

                          <TableCell component="td" scope="row" padding="none" key={"amount" + index}>
                            <div style={{textAlign: 'right', width: 150, color: '#000000', fontSize: 16 }}>
                              { row.amount_formatted }
                            </div>
                          </TableCell>

                          <TableCell component="td" scope="row" padding="none" key={"transaction_type" + index}>
                            <div style={{textAlign: 'left', width: 120, color: '#000000', fontSize: 16 }}>
                              { row.amount_sign == 1 &&
                                <FormattedMessage id="Donate" defaultMessage="Donate" />
                              }
                              {
                                row.amount_sign == -1 &&
                                <FormattedMessage id="Redeem" defaultMessage="Redeem" />
                              }
                            </div>
                          </TableCell>

                          <TableCell component="td" scope="row" padding="none" key={"date_time" + index}>
                            <div style={{textAlign: 'center', width: 150, color: '#000000', fontSize: 16 }}>
                              { DateTimeHelper.getUSFormattedDateAndTime(row.date_time) }
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                  </TableBody>
                </Table>  

              </Grid>
                              
            </Grid>
        </div>
    );
  }
}

const mapStateToProps = state => {
  const session = state.session;

  const report = state.report;
  const list_report_pending_status = state.list_report_pending_status;
  const list_report_fulfilled_status = state.list_report_fulfilled_status;
  const list_report_rejected_status = state.list_report_rejected_status;

  return { 
    session,
    report, 
    list_report_pending_status, 
    list_report_fulfilled_status, 
    list_report_rejected_status 
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    listReportAction, 
    listReportPendingStatusAction, 
    listReportFulfilledStatusAction, 
    listReportRejectedStatusAction,
    validateSessionAction
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(HistoryReport);

export default withStyles(HistoryReportStyle)(injectIntl(hoc));