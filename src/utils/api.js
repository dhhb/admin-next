import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import config from 'c0nfig';
import { EventEmitter } from 'events';

superagentJsonapify(request);

class ApiEmitter extends EventEmitter {}

const events = new ApiEmitter();
const apiUrl = `${config.api.url}/v1`;

let sessionTokenId;

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

function _request (resource, method = 'GET', params, query) {
  const url = `${apiUrl}${resource}`;

  return new Promise((resolve, reject) => {
    request(method, url)
      .set('Content-Type', 'application/vnd.api+json')
      .use(req => {
        events.emit('request:start', req);

        if (sessionTokenId) {
          req.set('Authorization', sessionTokenId);
        }
      })
      .query(query)
      .send(params)
      .then(res => {
        events.emit('request:end', res);
        resolve(res.body && res.body.data || {});
      })
      .catch(err => {
        events.emit('request:end', err.response);

        if (err.status === 401) {
          events.emit('unauthorized', err);
        }

        reject(_parseJsonApiError(err));
      });
  });
}

function setSession (tokenId) {
  sessionTokenId = tokenId;
}

function authorize (creds) {
  return _request('/token', 'POST', _createJsonApiRecord('token', creds));
}

function getUsers (opts = {}) {
  let query = {};

  if (opts.article) {
    query.include = 'articles';
  }

  return _request('/users', 'GET', {}, query);
}

function getUser (id) {
  return _request(`/users/${id}`, 'GET');
}

function createUser (data) {
  return _request('/users', 'POST', _createJsonApiRecord('users', data));
}

function updateUser (data, id) {
  return _request(`/users/${id}`, 'PATCH', _createJsonApiRecord('users', id, data));
}

function deleteUser (id) {
  return _request(`/users/${id}`, 'DELETE');
}

function getArticles (opts = {}) {
  let query = {};

  if (opts.author) {
    query.include = 'author';
  }

  if (opts.filter) {
    query.filter = { ...opts.filter };
  }

  return _request('/articles', 'GET', {}, query);
}

function getArticle (id) {
  return _request(`/articles/${id}`, 'GET');
}

function createArticle (data) {
  return _request('/articles', 'POST', _createJsonApiRecord('articles', data));
}

function updateArticle (data, id) {
  return _request(`/articles/${id}`, 'PATCH', _createJsonApiRecord('articles', id, data));
}

function deleteArticle (id) {
  return _request(`/articles/${id}`, 'DELETE');
}

export default {
  events,
  authorize,
  login: authorize, // alias
  setSession,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
};
