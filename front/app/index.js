/**
 * Created by herzucco on 18/10/2014.
 */
var SocketManager = require('./bridge/SocketsManager');
window.s = SocketManager;


// Setup Game
/*GameState.prototype.create = function() {

  // Create & enable player sprite
  this.player = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'player');
    this.player2 = this.game.add.sprite(this.game.width/5, this.game.height - 200, 'player2');
  this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);

  this.player.body.collideWorldBounds = true;
  this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y
  this.player.body.drag.setTo(this.DRAG, 0); // x, y

    this.player2.body.collideWorldBounds = true;
    this.player2.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y
    this.player2.body.drag.setTo(this.DRAG, 0); // x, y
};



// The update() method is called every frame
GameState.prototype.update = function() {

    SocketManager.players.getNews();

    SocketManager.player
        .position(this.player.body.position.x, this.player.body.position.y)
        .speed(0, 0);
    SocketManager.emitPlayer();


    var p = SocketManager.players.getAll();
    p = p[Object.keys(p)[0]];

    if(p){
        this.player2.body.position.x = p.player.position.x;
        this.player2.body.position.y = p.player.position.y;
    }


  // Collide the player with the ground
  this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player2, this.ground);
    this.game.physics.arcade.collide(this.player, this.player2);

};*/

// Require game.js
require('./game.js');
