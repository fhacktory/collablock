/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./Constants');
var SocketManager = require('../bridge/SocketManager');

var players;

var PlayersPool = function PlayersPool(){

};

PlayersPool.prototype.create = function PlayersPoolCreate(game, infos){
    var player = game.add.sprite(this.game.width/2, this.game.height - 200, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.immovable = false;
    player.body.allowGravity = false;
    player.id = infos.id;
    player.serverUpdate = updatePlayer.bind(player);
    players.add(player);


    player.body.collideWorldBounds = true;
    player.body.maxVelocity.setTo(constants.MAX_SPEED, constants.MAX_SPEED * 10);
    player.body.drag.setTo(constants.DRAG, 0);
};

PlayersPool.prototype.init = function PlayersPoolCreate(game){
    players = game.add.group();
};

PlayersPool.prototype.remove = function PlayersPoolCreate(id){
    players.iterate()
};

PlayersPool.prototype.update = function PlayersPoolCreate(game){

};

var updatePlayer = function updatePlayer(){
    var infos = SocketManager.getAll()[this.id];
    this.body.position.x = infos.player.position.x;
    this.body.position.y = infos.player.position.y;
};
module.exports = new PlayersPool();