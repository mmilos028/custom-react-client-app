import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
//import HomeIcon from '@material-ui/icons/Home';
//import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/ExitToApp';
//import BuildIcon from '@material-ui/icons/Build';
//import PeopleIcon from '@material-ui/icons/People';
//import KeyIcon from '@material-ui/icons/VpnKey';
//import LanguageIcon from '@material-ui/icons/Language';
import { FormattedMessage } from 'react-intl';
import HeaderMainMenuStyle from "./HeaderMainMenuStyle";
import { setLanguageAction } from '../../redux/actions/language/LanguageActions';
import { logoutAction, saveLogoutAction } from '../../redux/actions/session/SessionActions';
import { setMenuAction, setSubmenuVisibleAction } from '../../redux/actions/menu/MenuActions';
//import Hidden from '@material-ui/core/Hidden';
//import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
//import AddIcon from '@material-ui/icons/Add';
//import EditIcon from '@material-ui/icons/Edit';
//import SearchIcon from '@material-ui/icons/Search';

import { IS_DESKTOP_APPLICATION } from '../../configuration/Config';

class HeaderMainMenu extends React.Component {

    classes = null;

    state = {
        MyAccountAnchorEl: null,
        VouchersAnchorEl: null,
        LanguagesAnchorEl: null
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        routes: PropTypes.array,
        notifyVisibleSubmenu: PropTypes.func.isRequired,
        notifyToggleSidebar: PropTypes.func.isRequired,
            
        language: PropTypes.string,
        language_messages: PropTypes.object,
        setLanguageAction: PropTypes.func.isRequired,
        logoutAction: PropTypes.func.isRequired,
        saveLogoutAction: PropTypes.func.isRequired,

        setMenuAction: PropTypes.func.isRequired,
        
        session: PropTypes.object,
        menu: PropTypes.string
    }

    constructor(props) 
    {
        super(props);

        this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);

        this.handleMyAccountButtonClick = this.handleMyAccountButtonClick.bind(this);

        this.handleVouchersButtonClick = this.handleVouchersButtonClick.bind(this);

        this.handleAttendantButtonClick = this.handleAttendantButtonClick.bind(this);

        this.handleLanguageButtonClick = this.handleLanguageButtonClick.bind(this);

        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);

        this.handleCreateMemberCardButtonClick = this.handleCreateMemberCardButtonClick.bind(this);

        this.handleClose = this.handleClose.bind(this);
    }

    handleHomeButtonClick()
    {
        this.props['history'].push('/authenticated/home');
    }

    handleMyAccountButtonClick(event)
    {
        this.setState(
            {
                MyAccountAnchorEl: event.currentTarget,
                VouchersAnchorEl: null,
                LanguagesAnchorEl: null
            }
        );
    }

    handleVouchersButtonClick(event)
    {
        this.setState(
            {
                MyAccountAnchorEl: null,
                VouchersAnchorEl: event.currentTarget,
                LanguagesAnchorEl: null
            }
        );
    }

    handleAttendantButtonClick(event)
    {
        this.handleChangePage('/authenticated/attendant');
    }

    handleLanguageButtonClick(event)
    {
        this.setState(
            {
                MyAccountAnchorEl: null,
                VouchersAnchorEl: null,
                LanguagesAnchorEl: event.currentTarget
            }
        );
    }

    handleCreateMemberCardButtonClick(event)
    {
        this.handleChangePage('/authenticated/create-member-card');
    }

    handleChangeLanguageClick(language)
    {
      this.props['setLanguageAction'](language); this.handleClose();
    }

    handleLogoutButtonClick()
    {
        //console.log("HeaderMainMenu :: handleLogoutButtonClick");
        this.props['logoutAction']({ backoffice_session_id: this.props['session'].backoffice_session_id, jwt_token: this.props['session'].jwt_token })
        .then((response) => {
            //console.log(response);
            this.props['saveLogoutAction']();
            if(!IS_DESKTOP_APPLICATION)
            {
                localStorage.clear();
            }
            this.props['history'].push('/login');
          });

    }

    handleClose()
    {
        this.setState(
            {
                MyAccountAnchorEl: null,
                VouchersAnchorEl: null,
                LanguagesAnchorEl: null
            }
        );
    }

    handleChangePage(pageUri)
    {
        this.props['history'].push(pageUri); this.handleClose();
    }

    render() {
        return(
        <AppBar position="fixed"
        className={classNames(this.props['classes'].appBar, this.props['openSidebar'] && this.props['classes'].appBarShift)}>
            <Toolbar>    
                            
                <div className={this.props['classes'].leftToolbarButtons}>
                    
                    <Button color="inherit" onClick={() => { this.props['history'].push('/authenticated/create-member-card'); }}>                            
                        <FormattedMessage id="Create Member Card" defaultMessage="Create Member Card" />
                    </Button>

                    <Button color="inherit" onClick={() => { this.props['history'].push('/authenticated/redeem'); }} className={classNames(this.props['classes'].buttonSpace)}>
                        <FormattedMessage id="Redeem" defaultMessage="Redeem" />
                    </Button>

                    <Button color="inherit" onClick={() => { this.props['history'].push('/authenticated/report'); }} className={classNames(this.props['classes'].buttonSpace)}>
                        <FormattedMessage id="Report" defaultMessage="Report" />
                    </Button>

                    <Button color="inherit" onClick={() => { this.props['history'].push('/authenticated/history'); }} className={classNames(this.props['classes'].buttonSpace)}>
                        <FormattedMessage id="History" defaultMessage="History" />
                    </Button>
                                            
                </div>                
                
                <div className={this.props['classes'].grow} />

                <Button color="secondary" variant="contained" onClick={this.handleLogoutButtonClick}>
                    <ExitIcon />
                    <FormattedMessage id="Logout" defaultMessage="Logout" />
                </Button>
                
            </Toolbar>
        </AppBar>
        );
    }
}

// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { language, language_messages, setLanguageAction} = state.languageState;
    const { session, logoutAction, saveLogoutAction } = state.session;  
    const { menu, setMenuAction, setSubmenuVisibleAction } = state.menu;
    return { language, language_messages, setLanguageAction, logoutAction, session, menu, setMenuAction, setSubmenuVisibleAction };
};
  
const mapDispatchToProps = dispatch => (
    bindActionCreators({ setLanguageAction, logoutAction, saveLogoutAction, setMenuAction, setSubmenuVisibleAction }, dispatch)
);
  
const hoc = connect(mapStateToProps, mapDispatchToProps)(HeaderMainMenu);

export default withStyles(HeaderMainMenuStyle)(hoc);