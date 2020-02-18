import Axios from 'axios';

import qs from 'qs';

import * as config from '../../configuration/Config';

const personalInformationForHomePageService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/home/personal-information',
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
    personalInformationForHomePageService
}