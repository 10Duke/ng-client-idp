module.exports = function(config)
{
  config.set({
      basePath:     '..'
    , frameworks:   ['jasmine']
    , browsers:     ['PhantomJS']
    , reporters:    ['progress', 'coverage']
    , preprocessors: {
          'dist/*.js': ['coverage']
      }
    , files:        [
          'node_modules/angular/angular.min.js'
        , 'node_modules/angular-mocks/angular-mocks.js'
        , 'dist/10duke-ng-client-api-idp.js'
        , 'test/*.js'
      ]
    , coverageReporter: {
          type : 'html'
        , dir : 'docs/tests/coverage/'
    }
  });
};
