var runner = require('../test_runner')
  , assert = require('assert')
  , _ = require('lodash');

runner.run(function () {

  describe('Resources', function() {

    var browser = null;

    beforeEach(function () {
      browser = runner.browser({ features: 'scripts no-img iframe' });
    });

    afterEach(function () {
      browser.destroy();
    });

    it('suite', function (done) {
      browser
        .visit('/resources/1')
        .then(function () {
          browser.assert.success();
          browser.assert.url('http://localhost/resources/1');

          // Test number of resources.
          assert(browser.resources.length == 3, '[Error] Number of responses.');

          [
            { status: 200, url: 'http://localhost/resources/1' },
            { status: 200, url: 'http://localhost/public/scripts/found.js' },
            { status: 404, url: 'http://localhost/public/scripts/notfound.js' },
          ].forEach(function (v, i) {
            var req = browser.resources[i].request
              , res = browser.resources[i].response;

            // request
            assert(req.method == 'GET',
              '[Error] Invalid method.');
            assert(req.url == v.url,
              '[Error] Invalid url (expect='+v.url+', actual='+req.url+')');

            // response
            assert(res.status == v.status,
              '[Error] Invalid response status(expect='+v.status+', actual='+res.status+')');
          });

          done();
        });
    });

    it('fetch', function (done) {
      browser
        .visit('/resources/1')
        .then(function () {
          browser.assert.success();
          browser.assert.url('http://localhost/resources/1');

          assert(browser.resources.length == 3, '[Error] Number of responses.');

          return browser.fetch('/resources/2')
        })
        .then(function (response) {
          // current location is not changed.
          browser.assert.url('http://localhost/resources/1');

          assert(response.status == 200, '[Error] Invalid response status.');
          return response.text(); // promise
        })
        .then(function (text) {
          assert(text == '{"ok":true}', '[Error] Invalid response text.');
        })
        .then(done)
        .catch(done);
    });

  });

});