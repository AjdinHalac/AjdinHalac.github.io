// eslint-disable-next-line
const local: any = {
    API_BASE_URL: 'http://localhost:5000',
    ADMIN_APP_URL: 'http://localhost:3003',
};

// eslint-disable-next-line
const production: any = {
    API_BASE_URL: 'https://backend.ajdinhalac.dev',
    ADMIN_APP_URL: 'https://ajdinhalac.dev',
};

const config = process.env.REACT_APP_BUILD_TARGET === 'LOCAL' ? local : production;

export default {
    DEFAULT_LANGUNAGE: 'en',
    ...config,
};
