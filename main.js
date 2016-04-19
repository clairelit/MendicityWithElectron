'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = require('electron').BrowserWindow;

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const expressApp = express();
const debug = require('debug')('express-test:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
var server;


//var window = window.$ = window.jQuery = require('./javascripts/jquery-1.12.1.min.js');
//var jquery = require('jquery');
//window.$ = require( '../js/jquery.js' ) ;

var Datastore = require ('nedb');
var db = new Datastore({'mendoPeopleList': 'public/mendoDatabase/mendoPeopleList.json', corruptAlertThreshold: 1, autoload: true});
//db ={};
//var db = new Datastore({mendoPeopleList: 'public/mendoDatabase', corruptAlertThreshold: 1, autoload: true});

//var fs = require('fs');

//const mongoClient = require('mongodb').MongoClient;
//const ObjectId = require('mongodb').ObjectID;

//Tells our app that we want to talk to MongoDB.
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('mongodb://localhost:27017/mendoPeopleList');

// If I am running locally then use 'mongodb://localhost:27017/test' otherwise
// look for the environment variable
//var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/mendoPeopleList';

/*mongoClient.connect(url, function(err, conn) {
        if(err){
            console.log(err.message);
            throw err;
        } else {
            console.log("Connected to DB");
            conn.close();
        }
});*/

/*
 * Requiring the following package to be able to use sessions.
 * Need sessions to be able to store user details
 */
const session = require('express-session');

//This makes the database accessible to the router
expressApp.use(function(req, res, next){
  req.db=db;
  next();
});


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  mainWindow.loadURL('http://127.0.0.1:3000');
  mainWindow.toggleDevTools();
}

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 640,
  	height: 400
  });



//Setting up the express app.  This must be put in before all middleware
//var app = express();

// view engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
expressApp.use(logger('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use('/', routes);
expressApp.set('port', port);



//Including this to get sessions to work
const expressSessionOptions = {
  secret:'mySecret',
  resave: true,
  saveUninitialized: true
}

//session middleware - has to be used
expressApp.use(session(expressSessionOptions));

//This makes the database accessible to the router
/*expressApp.use(function(req, res, next){
  req.db=db;
  next();
});*/

//Anytime i get any kind of a request, use routes, which is the index.js file
expressApp.use('/', routes);

// catch 404 and forward to error handler
expressApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (expressApp.get('env') === 'development') {
  expressApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
expressApp.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server = http.createServer(expressApp);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  mainWindow.on('closed', function() {
    mainWindow = null;
    server.close();
  });
});
module.exports = expressApp;
