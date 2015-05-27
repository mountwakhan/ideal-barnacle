module.exports = function (config) {
  'use strict';

  config.set({
      basePath: '',
      frameworks: ['mocha', 'chai', 'sinon'],
      browsers: ['PhantomJS'],
      // browsers: ['PhantomJS','Chrome', 'Firefox'],
      phantomjsLauncher: {
        cmd: {
          linux: __dirname + '/node_modules/phantomjs2/lib/phantom/bin/phantomjs',
          darwin: __dirname + '/node_modules/phantomjs2/lib/phantom/bin/phantomjs',
          win32: __dirname + '/node_modules/phantomjs2/lib/phantom/bin/phantomjs'
        }
      },
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
        'karma-phantomjs-launcher-nonet',
        'karma-chrome-launcher',
        'karma-firefox-launcher'
      ],
      preprocessors: {
        // './bundle/test/*.spec.js' : 'coverage'
        // code coverage causes broken build see
        // http://stackoverflow.com/questions/30470796/
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
