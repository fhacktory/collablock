/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./Constants');
var SocketManager = require('../bridge/SocketManager');
var Player = require('./Player');

var players;

var PlayersPool = function PlayersPool(){

};

PlayersPool.prototype.create = function PlayersPoolCreate(game, infos){
    var player = game.add.sprite(this.game.width/2, this.game.height - 200, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.immovable = true;
    player.body.allowGravity = false;
    player.id = infos.id;
    player.serverUpdate = updatePlayer;
    player.gameCache = game;

    players.add(player);

    player.body.collideWorldBounds = true;
    player.body.maxVelocity.setTo(constants.MAX_SPEED, constants.MAX_SPEED * 10);
    player.body.drag.setTo(constants.DRAG, 0);
};

PlayersPool.prototype.init = function PlayersPoolCreate(game){
    players = game.add.group();
};

PlayersPool.prototype.remove = function PlayersPoolCreate(id){
    var player = players.iterate('id', id, Phaser.Group.RETURN_CHILD);

    players.remove(player, true);
};

PlayersPool.prototype.update = function PlayersPoolCreate(game){
    var news = SocketManager.getNews();

    for(var i = 0; i < news.length; i++){
        this.create(news[i].id);
    }

    players.forEachAlive(globalUpdate);
};

var updatePlayer = function updatePlayer(player){
    var infos = SocketManager.getAll()[player.id];
    player.body.position.x = infos.player.position.x;
    player.body.position.y = infos.player.position.y;

    player.gameCache.physics.arcade.collide(Player.phaserObject, player);
};

var globalUpdate = function globalUpdate(player){
    player.update(player);
};

module.exports = new PlayersPool();