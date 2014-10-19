'use strict';

var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Keyboard = require('./Keyboard');
var Level = require('./Level');
var _ = require('lodash');


var sync = _.throttle(function sync(player){
    SocketManager.player
        .setPosition(player.phaserObject.body.position.x, player.phaserObject.body.position.y)
        .setVelocity(player.phaserObject.body.velocity.x, player.phaserObject.body.velocity.y);
    SocketManager.emitPlayer();
}, 50, {
    leading : true
});

var test;
var uncolored = true;

var Player = function Player(){
    this.phaserObject = null;
};

Player.prototype.init = function PlayerInit(game){

    test = new Phaser.BitmapData(game, "color_player",
                                     constants.PLAYER_CUBE.WIDTH,
                                     constants.PLAYER_CUBE.HEIGHT);

    test.context.fillStyle = "red";
    test.context.fillRect(0, 0, constants.PLAYER_CUBE.WIDTH,
                                constants.PLAYER_CUBE.HEIGHT);

    this.phaserObject = game.add.sprite(0, 0, test);

    this.phaserObject.bringToTop();

    game.physics.arcade.enable(this.phaserObject);

    this.phaserObject.body.collideWorldBounds = true;
    this.phaserObject.body.maxVelocity.setTo(constants.MAX_VELOCITY, constants.MAX_VELOCITY * 2); // x, y
    this.phaserObject.body.drag.setTo(constants.DRAG, 0); // x, y
};

Player.prototype.reset = function PlayerReset(){
    this.phaserObject.position.x = 0;
    this.phaserObject.position.y = 0;
};

Player.prototype.update = function PlayerUpdate(game){
    if(this.phaserObject){
        game.physics.arcade.collide(this.phaserObject, this.level.layer);
        game.physics.arcade.collide(this.phaserObject, this.level.end, function(){
            console.log('arrived');

            return true;
        });
        this.phaserObject.bringToTop();
        if (Keyboard.leftInputIsActive(game)) {
            // If the LEFT key is down, set the player velocity to move left
            this.phaserObject.body.acceleration.x = -constants.ACCELERATION;
        } else if (Keyboard.rightInputIsActive(game)) {
            // If the RIGHT key is down, set the player velocity to move right
            this.phaserObject.body.acceleration.x = constants.ACCELERATION;
        } else {
            this.phaserObject.body.acceleration.x = 0;
        }

        // Set a variable that is true when the player is touching the ground
        var onTheGround = this.phaserObject.body.blocked.down || this.phaserObject.body.touching.down;

        // Keep y velocity constant while the jump button is held for up to 150 ms
        if (onTheGround && Keyboard.upInputIsActive(game, 150)) {
            this.phaserObject.body.velocity.y = constants.JUMP_VELOCITY;
        }


        if(this.phaserObject.body.velocity.x !== 0 ||
            this.phaserObject.body.velocity.y !== 0){
            sync(this);
        }

        if(SocketManager.player.getColor() && uncolored){
            test.context.fillStyle = SocketManager.player.getColor();
            test.context.fillRect(0, 0, constants.PLAYER_CUBE.WIDTH,
                constants.PLAYER_CUBE.HEIGHT);
            uncolored = false;
        }
    }

};


module.exports = new Player();
