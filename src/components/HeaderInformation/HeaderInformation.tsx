
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderInformationStyle from "./HeaderInformationStyle";
import { setLanguageAction } from '../../redux/actions/language/LanguageActions';
import { logoutAction } from '../../redux/actions/session/SessionActions';
import { setSubmenuVisibleAction } from '../../redux/actions/menu/MenuActions';
import { FormattedMessage } from 'react-intl';

class HeaderInformation extends React.Component {

    classes = null;

    static propTypes = {
        classes: PropTypes.object.isRequired,
        routes: PropTypes.array,        
            
        language: PropTypes.string,
        language_messages: PropTypes.object,
        session: PropTypes.object,
        menu: PropTypes.string,

        setLanguageAction: PropTypes.func.isRequired,
        logoutAction: PropTypes.func.isRequired        
    }

    constructor(props) {
        super(props);
        this.classes = props.classes;

    }

    render() {
        return(
            <div className={classNames(this.props['classes'].content)}>
                <span className={classNames(this.props['classes'].textUsername)}>
                <FormattedMessage id="Cashier" defaultMessage="Cashier" />: { this.props['session'].username }
                </span>
                <FormattedMessage id="Operater / Location" defaultMessage="Operater / Location" />: { this.props['session']['affiliate_last_login_detail'] && this.props['session']['affiliate_last_login_detail'].path }
            </div>
        );
    }
}

// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { language, language_messages, setLanguageAction, logoutAction } = state.languageState;
    const { session } = state.session;
    const { menu, setMenuAction, setSubmenuVisibleAction } = state.menu;
    return { language, language_messages, setLanguageAction, logoutAction, session, menu, setMenuAction, setSubmenuVisibleAction };
};
  
const mapDispatchToProps = dispatch => (
    bindActionCreators({ setLanguageAction, logoutAction, setSubmenuVisibleAction }, dispatch)
);
  
const hoc = connect(mapStateToProps, mapDispatchToProps)(HeaderInformation);

export default withStyles(HeaderInformationStyle)(hoc);