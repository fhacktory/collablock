'use strict';

var http = require('http');
var path = require('path');

var express = require('express');
var serveStatic = require('serve-static');
var socketIO = require('socket.io');


var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(serveStatic(path.join(__dirname, '..', 'front')));

io.on('connection', function(socket) {
  socket.emit('handshake', {
    timestamp: +(new Date())
  });
});

server.listen(8080);
