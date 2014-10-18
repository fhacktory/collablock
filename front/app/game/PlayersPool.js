/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Player = require('./Player');

var players;

var PlayersPool = function PlayersPool(){

};

PlayersPool.prototype.create = function PlayersPoolCreate(game, id){
    var player = game.add.sprite(game.width/2, game.height - 200, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.immovable = true;
    player.body.allowGravity = false;
    player.id = id;
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
    console.log('really removed', id);
    var player = players.iterate('id', id, Phaser.Group.RETURN_CHILD);

    players.remove(player, true);
};

PlayersPool.prototype.update = function PlayersPoolCreate(game){
    var news = SocketManager.players.getNews();
    var i;
    for(i = 0; i < news.length; i++){
        this.create(game, news[i].player.id);
    }

    var removed = SocketManager.players.getRemove();
    for(i = 0; i < removed.length; i++){
        this.remove(removed[i]);
    }

    players.forEachAlive(globalUpdate);
};

var updatePlayer = function updatePlayer(player){
    var infos = SocketManager.players.getAll()[player.id];
    if(infos){
        player.body.position.x = infos.player.position.x;
        player.body.position.y = infos.player.position.y;

        player.gameCache.physics.arcade.collide(Player.phaserObject, player);
    }else{
        //pool.remove(player.id);
    }

};

var globalUpdate = function globalUpdate(player){
    player.serverUpdate(player);
};

var pool = new PlayersPool();

module.exports = pool;