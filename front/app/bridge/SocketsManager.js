/**
 * Created by herzucco on 18/10/2014.
 */
var socketIO = require('socket.io-client');
var socket = socketIO();


socket.on('connect', function(){
    console.log('connected');
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
});

