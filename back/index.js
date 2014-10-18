'use strict';

var http = require('http');
var path = require('path');

var express = require('express');
var serveStatic = require('serve-static');
var socketIO = require('socket.io');

var SocketHandler = require('./SocketHandler');


var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(serveStatic(path.join(__dirname, '..', 'front')));
new SocketHandler(io);

server.listen(8080);
