import robAnalyticsSDK from 'analytics-js-sdk';
import config from 'c0nfig';

// connect to analytics server
robAnalyticsSDK
  .config({
    url: config.analytics.url,
    reconnection: (config.env !== 'development')
  })
  .install();

export default robAnalyticsSDK;
