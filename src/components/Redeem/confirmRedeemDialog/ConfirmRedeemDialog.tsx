
import React from "react";
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import ConfirmRedeemDialogStyle from "./ConfirmRedeemDialogStyle";

type ConfirmRedeemDialogProps = {
  cancelRedeemFn: any,
  confirmRedeemFn: any
};

class ConfirmRedeemDialog extends React.Component<ConfirmRedeemDialogProps> {

    state = {
    }

    static propTypes = {
        cancelRedeemFn: PropTypes.func.isRequired,
        confirmRedeemFn: PropTypes.func.isRequired
    }

    constructor(props)
    {
        super(props);

        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickConfirmRedeem = this.handleClickConfirmRedeem.bind(this);
    }

    handleClickOpen()
    {
    }

    handleClickClose()
    {
      this.props['cancelRedeemFn']();
    }

    handleClickConfirmRedeem()
    {
        this.props['confirmRedeemFn']();
    }

    render()
    {
        return (
            <div>
              <Dialog
                open={true}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                onClose={this.handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{<FormattedMessage id="Confirm Redeem" defaultMessage="Confirm Redeem" />}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <FormattedMessage id="Please confirm Redeem ?" defaultMessage="Please confirm Redeem ?" />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClickClose} color="default" style={{ flex: 1  }}>
                    <FormattedMessage id="Cancel" defaultMessage="Cancel" />
                  </Button>
                  <Button onClick={this.handleClickConfirmRedeem} color="secondary" variant="contained" autoFocus>
                    <FormattedMessage id="Redeem" defaultMessage="Redeem" />
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );
    }
}

export default ConfirmRedeemDialog;