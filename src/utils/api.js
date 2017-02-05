import request from 'superagent';
import config from 'c0nfig';

const apiUrl = `${config.api.url}/v1`;

function createJsonApiRecord(type, id, attributes) {
  if (id && !attributes) {
    attributes = id;
    id = void 0;
  }

  const jsonData = { data: { type, attributes } };

  if (id) {
    jsonData.data.id = id;
  }

  return jsonData;
}

function call (endpoint, method = 'GET') {
  return request(method, `${apiUrl}${endpoint}`)
    .set('Content-Type', 'application/vnd.api+json');
}

function authorize (creds) {
  return call('/token', 'POST').send(createJsonApiRecord('token', creds));
}

export default {
  authorize
};
