import Axios from 'axios';

import qs from 'qs';

import * as config from '../../../../configuration/Config';

const searchListVouchersService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/search-prepaid-cards',
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

const listAvailableAmountsService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-available-amounts',
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

const listAvailableCurrencyService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-available-currency',
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

const listAvailableStatusesService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-available-statuses',
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

const listAffiliateCreatorsService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-affiliate-creators',
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

const listAffiliateOwnersService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-affiliate-owners',
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

const listUsedByPlayerService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-used-by-player',
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

const listAffiliatesForCurrencyService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-affiliates-for-currency',
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

const createVoucherCardService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/create-voucher-card',
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

const editVoucherCardService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/edit-voucher-card',
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

const listVouchersService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-prepaid-cards',
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

const createMemberCardService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/create-member-card',
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

const editMemberCardService = (reportData) => {
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
  
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/edit-member-card',
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

const getCreateMemberCardConfigService = () => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/get-create-member-card-config',
        [],
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

const listCardInformationsService = (reportData) => {
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
 
    const request = Axios.post(config.REST_SERVICE_BASE_URL + '/vouchers/list-card-informations',
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
    searchListVouchersService,
    listAvailableAmountsService,
    listAvailableCurrencyService,
    listAvailableStatusesService,
    listAffiliateCreatorsService,
    listAffiliateOwnersService,
    listUsedByPlayerService,
    listAffiliatesForCurrencyService,
    createVoucherCardService,
    editVoucherCardService,
    listVouchersService,
    createMemberCardService,
    editMemberCardService,
    getCreateMemberCardConfigService,
    listCardInformationsService
};