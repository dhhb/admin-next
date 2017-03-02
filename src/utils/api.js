import config from 'c0nfig';
import createApiClient from 'api-client-js';

const api = createApiClient(config.api.url);

export default api;
