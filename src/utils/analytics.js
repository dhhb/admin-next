import config from 'c0nfig';
import robAnalyticsSDK from 'analytics-js-sdk';

// connect to analytics server
robAnalyticsSDK
  .config({
    url: config.analytics.url,
    reconnection: (config.env !== 'development')
  })
  .install();

export default robAnalyticsSDK;
