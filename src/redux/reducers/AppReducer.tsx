// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';

// IMPORT REDUCERS

import { LanguageReducer } from './language/LanguageReducer';
import { SessionReducer } from './session/SessionReducer';
import { MenuReducer } from './menu/MenuReducer';
import { ReportReducer } from './report/ReportReducer';
import { MacAddressReducer } from './mac_address/MacAddressReducer';

// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    languageState: LanguageReducer,
    session: SessionReducer,
    menu: MenuReducer,
    report: ReportReducer,
    mac_address: MacAddressReducer,
});