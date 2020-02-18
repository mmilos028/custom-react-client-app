import Axios from 'axios';

import qs from 'qs';

import * as config from '../../configuration/Config';

const loginUserService = (loginData) => {
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    /*const payload = JSON.stringify({
        username: loginData.username,
        password: loginData.password
    })*/

    const payload = qs.stringify({
        username: loginData.username,
        password: loginData.password,
    });
 
    const request = Axios.post(
        config.REST_SERVICE_BASE_URL + '/authenticate/login-backoffice',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

const logoutUserService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    const payload = qs.stringify({
        backoffice_session_id: reportData.backoffice_session_id
    });
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/authenticate/logout-backoffice',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

const pingSessionService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    const payload = qs.stringify({
        backoffice_session_id: reportData.backoffice_session_id
    });
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/session-validation/ping-session',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

const validateSessionService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    const payload = qs.stringify({
        backoffice_session_id: reportData.backoffice_session_id
    });
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/session/validate-session',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

const getSessionRemainingTimeService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    const payload = qs.stringify({
        backoffice_session_id: reportData.backoffice_session_id
    });
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/session/get-session-remaining-time',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

const checkCashierMacAddressService = (loginData) => {
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    /*const payload = JSON.stringify({
        username: loginData.username,
        password: loginData.password
    })*/

    const payload = qs.stringify({
        username: loginData.username,
        password: loginData.password,
        mac_address: loginData.mac_address
    });
 
    const request = Axios.post(
        config.REST_SERVICE_BASE_URL + '/authenticate/check-cashier-mac-address',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

export { 
    loginUserService, 
    logoutUserService, 
    pingSessionService, 
    validateSessionService, 
    getSessionRemainingTimeService,
    checkCashierMacAddressService
};