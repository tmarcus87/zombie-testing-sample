#!/usr/bin/env node

var Browser = require('zombie');

var PORT = 3100;

var isReady = false;
module.exports = {
  run: function (describes) {
    describe('', function () {

      before(function (done) {
        if (isReady) {
          return done();
        }
        require('./server')(PORT, function (err, server) {
          isReady = true;
          done(err);
        });
      });

      describes();

    });
  },
  browser: function (options) {
    Browser.localhost('localhost', PORT);
    return new Browser(options);
  },
  wrapper: function (fn) {
    if (fn.length == 0) {
      return function () {
        return fn();
      }
    } else if (fn.length == 1) {
      return function (done) {
        try {
          fn(done);
        } catch (e) {
          done(e);
        }
      }
    }
  }
};