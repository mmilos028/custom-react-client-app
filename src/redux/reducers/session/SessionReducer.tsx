
import {
    LOGIN,
    LOGOUT,
    SAVE_LOGIN,
    SAVE_LOGOUT
} from '../../actions/session/SessionActions';

import { DEBUG_CONSOLE } from "../../../configuration/Config";

const initialState = {
    session: {}
}

let SessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: 
            return {
                ...state, 
                session: action.payload,
            };
        case SAVE_LOGIN:
            return {
                ...state,
                session: action.payload
            };  
        case LOGOUT:
            if(DEBUG_CONSOLE){
                console.log(state);
            }
            return initialState;
        case SAVE_LOGOUT:
            return initialState;
        default: 
            return state;    
    }
};

export { SessionReducer };