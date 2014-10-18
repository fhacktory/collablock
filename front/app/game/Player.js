/**
 * Created by herzucco on 18/10/2014.
 */
/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./Constants');
var SocketManager = require('../bridge/SocketManager');

var Player = function Player(){
    this.phaserObject = null;
};

Player.prototype.init = function PlayerInit(game){
    this.phaserObject = game.add.sprite(this.game.width/2, this.game.height - 64, 'player');

    game.physics.enable(this.phaserObject, Phaser.Physics.ARCADE);

    this.phaserObject.body.collideWorldBounds = true;
    this.phaserObject.body.maxVelocity.setTo(constants.MAX_SPEED, constants.MAX_SPEED * 10); // x, y
    this.phaserObject.body.drag.setTo(constants.DRAG, 0); // x, y
};

Player.prototype.update = function PlayerUpdate(game){
    SocketManager.player
        .position(this.phaserObject.body.position.x, this.phaserObject.body.position.y)
        .speed(0, 0);
    SocketManager.emitPlayer();
};

module.exports = new Player();