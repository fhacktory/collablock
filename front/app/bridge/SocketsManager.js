'use strict';

var socketIO = require('socket.io-client');

var levelManager = require('./SocketLevelManager');
var playerManager = require('./SocketPlayerManager');
var playersManager = require('./SocketPlayersManager.js');

var socket = socketIO();
var _isConnected = false;


var SocketManager = function SocketManager(){
    var self = this;
    socket.on('connect', function(){
        _isConnected = true;
    });

    socket.on('handshake', function(data){
        self.player.setId(data.id);
    });

    socket.on('connect_error', function(){
        _isConnected = false;
    });

    socket.on('new_player', function(data){
        self.players.addNew(data.id);
    });

    socket.on('states', function(data){
        delete data.players[self.player.getId()];

        self.players.update(data.players);
    });
};

SocketManager.prototype.isConnected = function SocketManagerIsConnected(){
    return _isConnected;
};

SocketManager.prototype.emitPlayer = function SocketManagerEmitPlayer(){
    socket.emit('state', this.player.build());
};


SocketManager.prototype.player = playerManager;
SocketManager.prototype.level = levelManager;
SocketManager.prototype.players = playersManager;

module.exports = new SocketManager();
