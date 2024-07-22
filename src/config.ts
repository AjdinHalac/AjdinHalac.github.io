// eslint-disable-next-line
const local: any = {
    API_BASE_URL: 'http://localhost:5000',
    ADMIN_APP_URL: 'http://localhost:3003',
};

// eslint-disable-next-line
const production: any = {
    API_BASE_URL: 'http://backend.ajdinhalac.dev',
    ADMIN_APP_URL: 'https://ajdinhalac.github.com',
};

const config = process.env.REACT_APP_BUILD_TARGET === 'PRODUCTION' ? production : local;

export default {
    DEFAULT_LANGUNAGE: 'en',
    ...config,
};
