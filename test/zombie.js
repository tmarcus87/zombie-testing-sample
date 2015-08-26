var runner = require('../test_runner')
  , assert = require('assert')
  , _ = require('lodash');


runner.run(function () {

  describe('Browser', function () {

    describe('Browser#suite', function () {

      var browser = null;

      before(function () {
        browser = runner.browser();
      });

      after(function () {
        browser.destroy();
      });

      it('ok', function (done) {
        browser
          .visit('/')
          .then(function () {
            browser.assert.success();
            browser.assert.url('/');
          })
          .then(done);
      });

    });

    describe('Briwser#waitDuration', function () {

      var browser = null;

      before(function () {
        browser = runner.browser({ waitDuration: '2s' });
      });

      after(function () {
        browser.destroy();
      });

      it('ok', function (done) {
        browser
          .visit('/browser/timeout/1000')
          .then(function () {
            browser.assert.success();
            browser.assert.url('/browser/timeout/1000');
          })
          .then(done);
      });

      it('timeout', function (done) {
        browser
          .visit('/browser/timeout/3000')
          .then(function (next) {
            assert.fail(true, 'Success to get page in 2s.');
          })
          .catch(function (e) {
            assert(
                e.message == 'Timeout: did not get to load all resources on this page',
                'Invalid error was caught : ' + e.stack);
            done();
          })
      });
    });

    describe('Browser#referrer', function () {

      var browser = null;

      before(function () {
        browser = runner.browser({ referrer: 'http://example.com/hoge/fuga' });
      });

      after(function () {
        browser.destroy();
      });

      it('ok', function (done) {
        browser
          .visit('/browser/header?name=referrer')
          .then(function () {
            browser.assert.text('body', 'http://example.com/hoge/fuga');
          })
          .then(done);
      });

    });

    describe('Browser#errors', function () {

      var browser = null;

      before(function () {
        browser = runner.browser();
      });

      after(function () {
        browser.destroy();
      });

      it('ok', function (done) {
        browser
          .visit('/browser/notfound', function () {
            var ERROR_MESSAGE =
              'Server returned status code 404 from http://localhost/browser/notfound';
            assert(browser.errors.length === 1, 'The number of errors is not "1".');
            assert(browser.errors[0].message === ERROR_MESSAGE, 'Invalid error message.');
            done();
          });
      });

    });

    describe('Browser#reload', function() {

      var browser = null;

      before(function () {
        browser = runner.browser();
      });

      after(function () {
        browser.destroy();
      });

      it('ok', function (done) {
        browser
          .visit('/browser/reload')
          .then(function () {
            assert.equal(browser.html(), '<html><head></head><body>1</body></html>', 'Unexpected html.');

            return browser.visit('/browser/reload');
          })
          .then(function () {
            assert.equal(browser.html(), '<html><head></head><body>2</body></html>', 'Unexpected html.');
            done();
          })
          .catch(done);

      });
    });

  });

});