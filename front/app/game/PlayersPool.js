'use strict';

var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Player = require('./Player');

var players;

var updatePlayer = function updatePlayer(player){
    var infos = SocketManager.players.getAll()[player.id];

    if (infos) {
      player.body.position.x = infos.p.x;
      player.body.position.y = infos.p.y;

      player.gameCache.physics.arcade.collide(Player.phaserObject, player);
    }
};

var globalUpdate = function globalUpdate(player){
    player.serverUpdate(player);
};

var PlayersPool = function PlayersPool(){

};

PlayersPool.prototype.create = function PlayersPoolCreate(game, id){
    var test = new Phaser.BitmapData(game, "color_"+id, 32, 32);

    test.context.fillStyle = "red";
    test.context.fillRect(0, 0, 32, 32);

    var player = game.add.sprite(game.width/2, game.height - 200, test);
    player.bringToTop();

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.immovable = true;
    player.body.allowGravity = false;
    player.id = id;
    player.serverUpdate = updatePlayer;
    player.gameCache = game;

    players.add(player);

    player.body.collideWorldBounds = true;
    player.body.maxVelocity.setTo(constants.MAX_VELOCITY, constants.MAX_VELOCITY * 10);
    player.body.drag.setTo(constants.DRAG, 0);
};

PlayersPool.prototype.init = function PlayersPoolInit(game){
    players = game.add.group();
};

PlayersPool.prototype.remove = function PlayersPoolRemove(id){
    var player = players.iterate('id', id, Phaser.Group.RETURN_CHILD);

    players.remove(player, true);
};

PlayersPool.prototype.update = function PlayersPoolUpdate(game){
    var news = SocketManager.players.getNews();
    for(var i = 0; i < news.length; i++){
        this.create(game, news[i].id);
    }

    var removed = SocketManager.players.getRemove();
    for(i = 0; i < removed.length; i++){
        this.remove(removed[i]);
    }

    players.forEachAlive(globalUpdate);
};

PlayersPool.prototype.getPlayers = function() {
  return players;
};

module.exports = new PlayersPool();
