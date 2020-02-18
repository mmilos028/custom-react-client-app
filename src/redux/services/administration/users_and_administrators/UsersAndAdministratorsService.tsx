import Axios from 'axios';

import qs from 'qs';

import * as config from '../../../../configuration/Config';

const listAllRolesService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/list-all-roles',
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

const listAffiliatesForNewUserService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/list-affiliates-for-new-user',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {
            let newReport = [];
            for(let report of response.data.report){
                newReport.push({
                    affiliate_id: report.subject_id_to,
                    affiliate_name: report.name_to
                });
            };
            response.data.report = newReport;
            return response.data;
        })
        .catch((error) => {
            console.error(error);
           return [];
        });
};

const listAffiliateCurrenciesService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/list-affiliate-currencies',
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

const listTerminalsNewRejectedService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/list-terminals-new-rejected',
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

const getAffiliateDetailsService = (reportData) => {
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
        backoffice_session_id: reportData.backoffice_session_id,
        affiliate_id: reportData.affiliate_id
    });
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/get-affiliate-details',
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

const getSuperRoleService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/get-super-role',
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

const createNewUserService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/create-new-user',
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

const searchUsersService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/users-and-administrators/search-users',
        payload,
        axiosConfig
    );

    return request
        .then((response) => {            
            return response.data.report;
        })
        .catch((error) => {
            console.error(error);
           return [];
        });
};


export { 
    listAllRolesService,
    listAffiliatesForNewUserService,
    listAffiliateCurrenciesService,
    listTerminalsNewRejectedService,
    getAffiliateDetailsService,
    getSuperRoleService,
    createNewUserService,
    searchUsersService
};