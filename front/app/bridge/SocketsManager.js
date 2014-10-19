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

    socket.on('error', function() {
      _isConnected = false;
    });

    socket.on('disconnect', function() {
      _isConnected = false;
    });

    socket.on('handshake', function(data){
      self.player.setId(data.user.id);
      self.player.setColor(data.user.color);
      self.players.syncNewPlayers(data.states);
    });

    socket.on('new_player', function(data){
      self.players.addNew(data.id, data.color);
    });

    socket.on('player_left', function(data){
      self.players.remove(data.id);
    });

    socket.on('level', function(data){
        console.log('oko');
      self.level.setLevel(data);
    });

    socket.on('state', function(data){
      self.players.update(data);
    });
};

SocketManager.prototype.isConnected = function SocketManagerIsConnected(){
    return _isConnected;
};

SocketManager.prototype.emitPlayer = function SocketManagerEmitPlayer(){
    socket.emit('state', this.player.build());
};

SocketManager.prototype.emitLevel = function SocketManagerEmitLevel(){
    socket.emit('level_finished', {});
};

SocketManager.prototype.player = playerManager;
SocketManager.prototype.level = levelManager;
SocketManager.prototype.players = playersManager;

module.exports = new SocketManager();
