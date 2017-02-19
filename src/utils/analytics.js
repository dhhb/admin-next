import robAnalyticsSDK from 'analytics-js-sdk';
import config from 'c0nfig';

// connect to analytics server
robAnalyticsSDK
  .config({url: config.analytics.url})
  .install();

export default robAnalyticsSDK;
