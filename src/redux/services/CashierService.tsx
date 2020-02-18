import Axios from 'axios';

import qs from 'qs';

import * as config from '../../configuration/Config';

const listCashierServiceReportService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    let payloadData = JSON.parse(JSON.stringify(reportData));
    delete payloadData['jwt_token'];

    const payload = qs.stringify({
        ...payloadData
    });
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/service-report/get-cashier-service-report',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
           return [];
        });
};

const resetCounterForLevelService = (reportData) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    if(config.USE_JWT_IN_RESPONSE)
    {
        axiosConfig.headers['JWT'] = reportData.jwt_token
    }

    let payloadData = JSON.parse(JSON.stringify(reportData));
    delete payloadData['jwt_token'];

    const payload = qs.stringify({
        ...payloadData
    });
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/service-report/reset-counter-for-level',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
           return [];
        });
};

export { 
    listCashierServiceReportService,
    resetCounterForLevelService
}