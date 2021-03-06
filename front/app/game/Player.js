'use strict';

var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Keyboard = require('./Keyboard');
var Level = require('./Level');
var _ = require('lodash');


var sync = _.throttle(function sync(player){
    if(player.phaserObject){
        SocketManager.player
            .setPosition(player.phaserObject.body.position.x, player.phaserObject.body.position.y)
            .setVelocity(player.phaserObject.body.velocity.x, player.phaserObject.body.velocity.y);
        SocketManager.emitPlayer();
    }
}, 50, {
    leading : true
});

var test;
var uncolored = true;
var touchedId = undefined;
var count = 200;
var Player = function Player(){
    this.phaserObject = null;
};

Player.prototype.init = function PlayerInit(game){
    uncolored = true;
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
    this.phaserObject.body.tilePadding.x = 20;
    this.phaserObject.body.tilePadding.y = 20;
    this.phaserObject.body.maxVelocity.setTo(constants.MAX_VELOCITY, constants.MAX_VELOCITY * 2); // x, y
    this.phaserObject.body.drag.setTo(constants.DRAG, 0); // x, y
};

Player.prototype.reset = function PlayerReset(){
    this.phaserObject = null;
};

Player.prototype.update = function PlayerUpdate(game){
    if(this.phaserObject){
        var self = this;
        game.physics.arcade.collide(this.phaserObject, this.level.layer);
        count++;
        game.physics.arcade.collide(this.phaserObject, this.level.end,
          null,
          function process(me, end) {
            if (end.index === 105 &&
                (me.body.position.x <= end.worldX + 30
                    && me.body.position.x >= end.worldX
                    && me.body.position.y <= end.worldY + 30
                    && me.body.position.y >= end.worldY)) {
                if(touchedId != end.worldX+"_"+end.worldY){
                    count = 0;
                    if(touchedId !== undefined && count >= 200){
                        SocketManager.emitEndUnTouched(touchedId, self.level.endMax);
                        touchedId = undefined;
                    }
                    touchedId = end.worldX+"_"+end.worldY;
                    SocketManager.emitEndTouched(touchedId, self.level.endMax);
                }
            }else{
                if(touchedId !== undefined && count >= 200){
                    SocketManager.emitEndUnTouched(touchedId, self.level.endMax);
                    touchedId = undefined;
                }
            }
            return false;
          }
        );

        if(this.phaserObject){

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
            var onTheGround = (this.phaserObject.body.blocked.down || this.phaserObject.body.touching.down)
                                && (!this.phaserObject.body.blocked.up && !this.phaserObject.body.touching.up);

            // Keep y velocity constant while the jump button is held for up to 150 ms
            if (onTheGround && Keyboard.upInputIsActive(game, 150)) {
                (new Phaser.Sound(game, 'jump')).play();
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
    }
};


module.exports = new Player();
