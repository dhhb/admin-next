import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import config from 'c0nfig';

superagentJsonapify(request);

const apiUrl = `${config.api.url}/v1`;

// conform to json api spec
// http://jsonapi.org
function _createJsonApiRecord (type, id, attributes) {
  if (id && !attributes) {
    attributes = id;
    id = void 0;
  }

  const jsonData = {data: { type, attributes }};

  if (id) {
    jsonData.data.id = id;
  }

  return jsonData;
}

function _parseJsonApiError (err = {}) {
  const jsonData = {
    status: err.status,
    message: err.message
  };

  const res = err.response;

  if (res && res.body) {
    jsonData.error = res.body.errors[0];
  } else {
    jsonData.error = {};
  }

  return jsonData;
}

function _request (resource, method = 'GET', params = {}, query = {}) {
  const url = `${apiUrl}${resource}`;

  return new Promise((resolve, reject) => {
    request(method, url)
      .set('Content-Type', 'application/vnd.api+json')
      .query(query)
      .send(params)
      .then(res => {
        resolve(res.body && res.body.data || {});
      })
      .catch(err => {
        reject(_parseJsonApiError(err));
      });
  });
}

function authorize (creds) {
  return _request('/token', 'POST', _createJsonApiRecord('token', creds));
}

export default {
  authorize
};
