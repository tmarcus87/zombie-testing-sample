var http = require('http')
  , express = require('express')
  , fs = require('fs')
  , path = require('path')
  , favicon = require('serve-favicon')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser');

module.exports = function (port, callback) {
  callback = callback || function () {};

  var app = express();

  app.set('port', port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/public/', express.static(path.join(__dirname, 'public')));

  fs.readdirSync('./routes')
    .forEach(function (f) {
      var fPath = path.join(__dirname, './routes', f);
      if (fs.statSync(fPath).isDirectory()) {
        return;
      }
      var name = path.basename(f, '.js');
      var prefix = '/' + ((name == 'index') ? '' : name);
      app.use(prefix, require(fPath));
    });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  var server = http.createServer(app);
  server.listen(port);
  server.on('error', callback);
  server.on('listening', callback);

};