import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BuildIcon from '@material-ui/icons/Build';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryReportPageStyle from './HistoryReportPageStyle';
import HistoryReport from "../../../components/HistoryReport/HistoryReport";
import HeaderInformation from "../../../components/HeaderInformation/HeaderInformation";
import { saveLoginAction } from '../../../redux/actions/session/SessionActions';

class HistoryReportPage extends React.Component {

  classes = null;

  state = {
  };

  static propTypes = {
    session: PropTypes.object,
    saveLoginAction: PropTypes.func.isRequired
  }

  constructor(props, context)
  {
    super(props, context);

    this.classes = props.classes;
  }

  componentWillUnmount()
  {
  }

  componentDidMount()
  {
  }

  render() 
  {
    return (
      <div className={this.classes['content']}>                
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <HeaderInformation />
          </Grid>
          <Grid item xs={12} sm={12}>
            <HistoryReport />
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(HistoryReportPage);

export default withStyles(HistoryReportPageStyle)(injectIntl(hoc));