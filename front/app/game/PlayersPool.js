'use strict';

var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Player = require('./Player');

var players;

var updatePlayer = function updatePlayer(player){
    var infos = SocketManager.players.getAll()[player.id];

    if (infos) {
        player.gameCache.physics.arcade.collide(Player.phaserObject, player, function(p){
            if (p.body.deltaAbsY() < 1) {
                p.body.moves = false;
              }
        });

        player.body.reset(infos.p.x, infos.p.y);
        player.x = infos.p.x;
        player.y = infos.p.y;

        Player.phaserObject.body.moves = true;
    }
};

var globalUpdate = function globalUpdate(player){
    player.serverUpdate(player);
};

var PlayersPool = function PlayersPool(){

};

PlayersPool.prototype.create = function PlayersPoolCreate(game, user){
    var test = new Phaser.BitmapData(game, "color_" + user.id,
                                     constants.PLAYER_CUBE.WIDTH,
                                     constants.PLAYER_CUBE.HEIGHT);

    console.log(user);
    test.context.fillStyle = user.color;
    test.context.fillRect(0, 0, constants.PLAYER_CUBE.WIDTH,
                                constants.PLAYER_CUBE.HEIGHT);

    var player = game.add.sprite(game.width/2, game.height - 200, test);
    player.bringToTop();

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.immovable = true;
    player.body.allowGravity = false;
    player.body.mass = 0.01;
    player.id = user.id;
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
        this.create(game, news[i]);
    }

    var removed = SocketManager.players.getRemove();
    for(i = 0; i < removed.length; i++){
        this.remove(removed[i]);
    }

    game.world.bringToTop(players);
    players.forEachAlive(globalUpdate);
};

PlayersPool.prototype.getPlayers = function() {
  return players;
};

module.exports = new PlayersPool();
