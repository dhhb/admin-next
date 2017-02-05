module.exports = {
  api: {
    url: process.env.API_URL || 'http://localhost:9876',
    sharedKey: process.env.API_SHARED_KEY || '18906320497eaad0088501a1b6f5485e33a4172b'
  },
  auth: {
    cookieName: process.env.AUTH_COOKIE_NAME || 'auth_token'
  }
};
