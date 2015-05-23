var gulp = require('gulp');
var proxy = require('proxy-middleware');
var _ = require('lodash');
var chalk = require('chalk');
var dateformat = require('dateformat');
var proxy = require('proxy-middleware');
var nodemon = require('gulp-nodemon');
var _ = require('lodash');
var path = require('path');

var config = localRequire('workflow/config');
var developerConfig = localRequire('project/config/developer-config');

gulp.task('server', ['server:rest', 'server:sync']);

gulp.task('server:rest', function () {
  nodemon({
    script: 'index.js',
    ext: 'json',
    watch: [
      path.join(config.project.path, 'routes.json'),
      path.join(config.project.path, 'data')
    ],
    // nodeArgs: ['--debug'],
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log('server restarted!');
  });
});

gulp.task('server:sync', ['server:rest'], function() {
  var browserSync = require('browser-sync');
  var url = require('url');
  var path = require('path');
  var fs = require('fs');
  var config = localRequire('workflow/config');

  // Parse out url and create the following config:
  //
  // EX:
  //
  // {
  //  host: localhost,
  //  port: 3000
  //  route: /api
  //
  // }
  var _url = _.template('http://localhost:<%= port %>/');
  var proxy1 = url.parse(_url({port: developerConfig.development.servers.web.port}));
  proxy1.route = '/api';

  var proxy2 = _.assign(proxy1);
  proxy2.route ='/public/api';

  browserSync({
    notify: true,
    open: true,
    logPrefix: chalk.grey(dateformat(new Date(), 'HH:MM:ss')) + ' browersync',
    ghostMode: false,
    server: {
      baseDir: config.sync.src,
      middleware: [
        // Middleware #1: Allow web page requests without .html file extension in URLs
        function(req, res, next) {
          var uri = url.parse(req.url);
          if(uri.pathname.length > 1 && path.extname(uri.pathname) === '' && fs.existsSync(config.sync.src + uri.pathname + '.html')) {
            req.url = uri.pathname + '.html' + (uri.search || '');
          }
          next();
        },
        // Middleware #2: Proxy request to availity-ekko server
        proxy(proxy1),
        proxy(proxy2)
      ]
    }
  });
});
