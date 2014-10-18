/**
 * Created by herzucco on 18/10/2014.
 */
var socketIO = require('socket.io-client');
var socket = socketIO();
var _isConnected = false;

var playerManager = require('./SocketPlayerManager');
var levelManager = require('./SocketLevelManager');
var playersManager = require('./SocketOthersManager');

var SocketManager = function SocketManager(){
    var self = this;
    socket.on('connect', function(){
        _isConnected = true;
    });

    socket.on('handshake', function(id){
        self.player.setId(id);
    });

    socket.on('connect_error', function(){
        _isConnected = false;
    });

    socket.on('new_player', function(id){
        self.players.addNew(id);
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
    socket.emit('state', this.player.build);
};


SocketManager.prototype.player = playerManager;
SocketManager.prototype.level = levelManager;
SocketManager.prototype.players = playersManager;

module.exports = new SocketManager();