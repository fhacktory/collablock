/**
 * Created by herzucco on 18/10/2014.
 */
/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./Constants');
var SocketManager = require('../bridge/SocketsManager');
var Keyboard = require('./Keyboard');
var Level = require('./Level');
var _ = require('lodash');

var count = 0;
var Player = function Player(){
    this.phaserObject = null;
};

Player.prototype.init = function PlayerInit(game){
    this.phaserObject = game.add.sprite(game.width/2, game.height - 400, 'player');

    game.physics.enable(this.phaserObject, Phaser.Physics.ARCADE);

    this.phaserObject.body.collideWorldBounds = true;
    this.phaserObject.body.maxVelocity.setTo(constants.MAX_SPEED, constants.MAX_SPEED * 10); // x, y
    this.phaserObject.body.drag.setTo(constants.DRAG, 0); // x, y
};

Player.prototype.update = function PlayerUpdate(game){
    game.physics.arcade.collide(this.phaserObject, Level.physic);
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
    var onTheGround = this.phaserObject.body.touching.down;
    if (onTheGround) this.canDoubleJump = true;

    if (Keyboard.upInputIsActive(game, 5)) {
        // Allow the player to adjust his jump height by holding the jump button
        if (this.canDoubleJump) this.canVariableJump = true;

        if (this.canDoubleJump || onTheGround) {
            // Jump when the player is touching the ground or they can double jump
            this.phaserObject.body.velocity.y = constants.JUMP_SPEED;

            // Disable ability to double jump if the player is jumping in the air
            if (!onTheGround) this.canDoubleJump = false;
        }
    }

    // Keep y velocity constant while the jump button is held for up to 150 ms
    if (this.canVariableJump && Keyboard.upInputIsActive(game, 150)) {
        this.phaserObject.body.velocity.y = constants.JUMP_SPEED;
    }

    // Don't allow variable jump height after the jump button is released
    if (!Keyboard.upInputIsActive(game)) {
        this.canVariableJump = false;
    }

    if(this.phaserObject.body.velocity.x !== 0 ||
        this.phaserObject.body.velocity.y !== 0){
        sync(this);

    }
};

var sync = _.throttle(function sync(player){
    SocketManager.player
        .position(player.phaserObject.body.position.x, player.phaserObject.body.position.y)
        .speed(player.phaserObject.body.velocity.x, player.phaserObject.body.velocity.y);
    SocketManager.emitPlayer();
}, 50, {
    leading : true
});

module.exports = new Player();