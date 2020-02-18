import {
    INIT_MAC_ADDRESS,
    SET_MAC_ADDRESS,
    SET_LIST_MAC_ADDRESS
} from '../../actions/mac_address/MacAddressActions';

// INITIALIZE STATE

const initialState = {
    mac_address: '',
    list_mac_address: []
};

// REDUCER

export const MacAddressReducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_MAC_ADDRESS:
            return {
                ...state,
                mac_address: initialState.mac_address,
                list_mac_address: initialState.list_mac_address
            };
        case SET_MAC_ADDRESS:
            return {
                ...state,
                mac_address: action.payload
            };
        case SET_LIST_MAC_ADDRESS:
            return {
                ...state,
                list_mac_address: action.payload
            }        
        default:
            return state;
    }
};