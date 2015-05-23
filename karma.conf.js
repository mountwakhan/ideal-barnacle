module.exports = function (config) {
  'use strict';

  config.set({
      basePath: '',
      frameworks: ['mocha', 'chai', 'sinon'],
      // Use Chrome for now https://github.com/ariya/phantomjs/issues/12204
      // browsers: ['PhantomJS'],
      browsers: ['Chrome', 'Firefox'],
      reporters: ['progress', 'coverage'],
      coverageReporter: {
        type : 'lcov',
        dir : __dirname + '/coverage/'
      },
      plugins : [
        'karma-coverage',
        'karma-mocha',
        'karma-chai',
        'karma-sinon',
        // Use Chrome for now https://github.com/ariya/phantomjs/issues/12204
        // 'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-firefox-launcher'
      ],
      preprocessors: {
        '**/bundled/test/*.spec.js' : 'coverage'
      },
      files : [
        { pattern: __dirname + "/bundle/test/*.spec.js", included: true }
      ],
      client : {
        mocha : {
          ui : "bdd"
        }
      },
      port: 9876,
      colors: true,
      autoWatch: false,
      logLevel: config.INFO
  });
};
