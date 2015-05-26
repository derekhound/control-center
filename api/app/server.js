var express       = require('express');

var morgan        = require('morgan');
var cors          = require('cors');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');
var multiparty    = require('connect-multiparty');

// setup system
var api = require('../system')();

// express application
var app = express();

// morgan
app.use(morgan('combined'));

// cors
app.use(cors({
  //origin: 'http://localhost:9000',
  origin: '*'
}));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie-parser & cookie-session
app.use(cookieParser());
app.use(cookieSession({
  secret: 'dolphin',
  cookie: {
    maxAge: 60 * 60
  }
}));

// multipart/form-data
// TODO: this middleware should be used under /api/1/upload api
app.use(multiparty());

// static files
app.use(express.static(api.config.general.paths.public));

// enable pre-flight CORS request
app.options('*', cors());


// setup routes
var auth = api.container.get('Auth').auth;
for (var name in api.config.route) {
  var actions = api.container.get(name);
  api.config.route[name].forEach(function(v) {
    if (v.auth === false) {
      app[v.method](v.path, actions[v.action]);
    } else {
      app[v.method](v.path, auth, actions[v.action]);
    }
  });
}

// start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  api.logger.info('listening at http://%s:%s', host, port);
});

