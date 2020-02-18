
export const INIT_MAC_ADDRESS = 'INIT_MAC_ADDRESS';
export const SET_MAC_ADDRESS = 'SET_MAC_ADDRESS';
export const SET_LIST_MAC_ADDRESS = 'SET_LIST_MAC_ADDRESS';


// ACTION GENERATORS

const initMacAddressAction = (payload) => ({
    type: INIT_MAC_ADDRESS,
    payload: payload
});

const setMacAddressAction = (payload) => ({
    type: SET_MAC_ADDRESS,
    payload: payload
});

const setListMacAddressAction = (payload) => ({
    type: SET_LIST_MAC_ADDRESS,
    payload: payload
});


// EXPORT ACTIONS

export { initMacAddressAction, setMacAddressAction, setListMacAddressAction };