var runner = require('../test_runner')
  , Browser = require('zombie')
  , assert = require('assert');

runner.run(function () {

  describe('Test of Zombie#Assertions', function () {

    var browser = null;

    beforeEach(function () {
      browser = runner.browser();
    });

    afterEach(function () {
      browser.destroy();
    });



    it('assert by global', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success()
          browser.assert.global('$');
          browser.assert.global('jQuery');
        })
        .then(done, done);
    }));



    it('assert by success', runner.wrapper(function (done) {
      browser.visit('/assert/status/200')
        .then(function () {
          browser.assert.success();
        })
        .then(done, done);
    }));

    it('assert by status', runner.wrapper(function (done) {
      // over 400 will throw a error.
      browser.visit('/assert/status/399')
        .then(function () {
          browser.assert.status(399);
        })
        .then(done, done);
    }));

    it('assert by redirected', runner.wrapper(function (done) {
      browser.visit('/assert/redirect')
        .then(function () {
          browser.assert.success();
          browser.assert.redirected();
        })
        .then(done, done);
    }));

    it('assert by url', runner.wrapper(function (done) {
      browser.visit('/assert/blank')
        .then(function () {
          browser.assert.success();
          browser.assert.url('http://' + browser.site + '/assert/blank');

          return browser.visit('/assert/redirect')
        })
        .then(function () {
          browser.assert.success();
          browser.assert.redirected();
          browser.assert.url('http://' + browser.site + '/assert/redirected');
        })
        .then(done, done);
    }));

    it('assert by cookie', runner.wrapper(function (done) {
      browser.visit('/assert/blank')
        .then(function () {
          browser.assert.success();
          browser.assert.cookie('value', null);
        })
        .then(function () {
          // Bake cookie
          browser.setCookie('value', 'ThisIsACookieValue');
        })
        .then(function () {
          // Test without reload.
          browser.assert.cookie('value', 'ThisIsACookieValue');
        })
        .then(function () {
          // Test with reload.
          return browser.reload();
        })
        .then(function () {
          browser.assert.cookie('value', 'ThisIsACookieValue');
        })
        .then(done, done);
    }));



    it('assert by attribute', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.attribute('form.sample-form', 'method', 'post');
        })
        .then(done, done);
    }));

    it('assert by className', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.className('form.sample-form', 'sample-form form-extra-class');
        })
        .then(done, done);
    }));

    it('assert by hasClass', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.hasClass('form.sample-form', 'form-extra-class');
        })
        .then(done, done);
    }));

    it('assert by hasNoClass', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.hasNoClass('form.sample-form', 'not-having-class');
        })
        .then(done, done);
    }));

    it('assert by element', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.element('form.sample-form');
        })
        .then(done, done);
    }));

    it('assert by elements', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.elements('form.sample-form input[type="text"]', 2);
          browser.assert.elements('form.sample-form input[type="submit"]', 1);
          browser.assert.elements('form.sample-form input[type="reset"]', 1);
          browser.assert.elements('form.sample-form a', 0);
        })
        .then(done, done);
    }));

    it('assert by input', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.input('form.sample-form input[name="input1"]', 'defaultValue1');
          browser.assert.input('form.sample-form input[name="input3"]', 'defaultValue3');
        })
        .then(done, done);
    }));

    it('assert by link', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.link('.links p a', 'LinkLabel', 'http://example.com');
        })
        .then(done, done);
    }));

    it('assert by style', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.style('.styles div', 'display', 'inline');
        })
        .then(done, done);
    }));

    it('assert by text', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();
          browser.assert.text('.texts p', 'Text 1.')
        })
        .then(done, done);
    }));

    it('assert by evaluate', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();

          // test with document.querySelectorAll().
          browser.assert.evaluate('document.querySelectorAll("input").length', 5);
          browser.assert.evaluate('document.querySelectorAll("input[name^=\'input\']").length', 3);

          // test with jQuery.
          browser.assert.evaluate('$("form input").length', 5);
          browser.assert.evaluate('$("form input[name^=\'input\']").length', 3);
        })
        .then(done, done);
    }));



    it('assert by hasFocus', runner.wrapper(function (done) {
      browser.visit('/assert/form')
        .then(function () {
          browser.assert.success();

          browser.focus('input[name="input2"]');
          
          browser.assert.hasFocus('input[name="input2"]');
        })
        .then(done, done);
    }));

  });

});