var runner = require('../test_runner.js')
  , assert = require('assert');

runner.run(function () {

  describe('Test of test_runner.js', function () {

    var status = 0;

    before(function () {
      assert(status == 0);
      status++;
    });

    after(function () {
      assert(status == 3);
    });

    it('sync test.', function () {
      assert(status == 1);
      status++;
    });

    it('async test', function (done) {
      assert(status == 2)
      setTimeout(function () {
        status++;
        done();
      }, 1000);
    });

  });

});