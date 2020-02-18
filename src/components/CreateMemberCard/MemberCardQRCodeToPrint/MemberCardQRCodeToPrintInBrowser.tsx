import React from "react";
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import QRCode from "qrcode.react";
import { GAME_CLIENT_URL } from "../../../configuration/Config";

type MemberCardQRCodeToPrintInBrowserProps = {
    card_prepaid_code: any,
    card_serial_number: any,
    card_amount: any,
    card_currency: any,
    card_expiry_date: any,
}

class MemberCardQRCodeToPrintInBrowser extends React.Component<MemberCardQRCodeToPrintInBrowserProps> {
  state = {
  };

  static propTypes = {
    //card to print information
    card_prepaid_code: PropTypes.any.isRequired,
    card_serial_number: PropTypes.any.isRequired,
    card_amount: PropTypes.any.isRequired,
    card_currency: PropTypes.any.isRequired,
    card_expiry_date: PropTypes.any.isRequired,
  }

  constructor(props, context)
  {
    super(props, context);
  }

  render() {
    return (
        <div style={{ marginTop: "0mm", marginLeft: "5mm", marginRight: "5mm", marginBottom: "0mm", padding: "0", width:"60.00mm", maxHeight: "45.00mm", position: 'relative', left: 0, top: 0 }}>
            <table style={{ width: "60.00mm", maxHeight: "45.00mm", background: "#FFFFFF", margin: "0", padding: "0", border:"1px dashed #666" }}>
            <tbody>
                <tr>
                    <td style={{ maxHeight: "5mm", textAlign: "center", padding: "0", margin: "0" }} colSpan={2}>
                        <span style={{ fontSize: "6mm", fontWeight: "normal", color: "rgb(0, 0, 0)" }}>
                            Amount:
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={{ height: "5mm", textAlign: "center", padding: "0", margin: "0" }} colSpan={2}>
                        <span style={{ fontSize: "5mm", fontWeight: "bold", color: "rgb(0, 0, 0)" }}>
                            { this.props['card_amount'] }&nbsp;
                        </span>
                        <span style={{ fontSize: "5mm", fontWeight: "normal", color: "rgb(64, 64, 64)" }}>
                            { this.props['card_currency'] }
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: "center", maxHeight: "3mm", padding: "0", margin: "0" }} colSpan={2}>
                        <span style={{ fontSize: "3mm", color: "rgb(0, 0, 0)" }}>
                            Expiry time:&nbsp;
                        </span>
                        <span style={{ fontSize: "3mm", fontWeight: "bold", color: "rgb(0, 0, 0)" }}>
                            { this.props['card_expiry_date'] }
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "0", margin: "0", textAlign: 'center' }} colSpan={2}>
                        { 
                            this.props['card_prepaid_code'] &&
                            <QRCode value={ (GAME_CLIENT_URL + ('$$1234567890123456'.replace("$$", "")) )} level='H' size={100} />
                        }
                    </td>
                </tr>
                <tr>
                    <td style={{ width: '50%', textAlign: 'left', maxHeight: "5mm", padding: "0", margin: "0" }}>
                        <span style={{ fontSize: '3mm'}}>
                            Serial number:
                        </span>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', maxHeight: "5mm", padding: "0", margin: "0" }}>
                        <span style={{ fontSize: '3mm', fontWeight: 'bold'}}>
                            { this.props['card_serial_number'] }
                        </span>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
  }
}

export default MemberCardQRCodeToPrintInBrowser;