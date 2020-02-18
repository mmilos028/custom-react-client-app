import Axios from 'axios';

import qs from 'qs';

import * as config from '../../configuration/Config';

const listTransferCreditReportService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/transaction-report/get-transfer-credit-report',
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

const listCashierHistoryReportService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/transaction-report/get-cashier-history-report',
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
    listTransferCreditReportService,
    listCashierHistoryReportService
};