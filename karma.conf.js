module.exports = function (config) {
  'use strict';
  
  config.set({
      basePath: '',
      frameworks: ['mocha', 'chai', 'sinon'],
      browsers: ['PhantomJS'],
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
        'karma-phantomjs-launcher'
      ],
      preprocessors: {
        '**/bundled/test/*.spec.js' : 'coverage'
      },
      files : [
        { pattern: __dirname + "/bundled/test/*.spec.js", included: true }
      ],
      client : {
        mocha : {
          ui : "bdd"
        }
      },
      port: 9876,
      colors: true,
      autoWatch: false,
      logLevel: config.DEBUG
  });
};
