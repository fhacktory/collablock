'use strict';

/**
 * Start Game stage
 */
var GameState = function(game) {
};


var map;
var layer;

// Load sprites
GameState.prototype.preload = function() {
  this.game.load.image('player', 'assets/player.jpg');
  // Load image map
  this.game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image('tiles', 'assets/tiles.png');
};

// Setup Game
GameState.prototype.create = function() {
  // Set stage background to something sky colored
  this.game.stage.backgroundColor = 0x98C8FF;

  // Load map
  map = game.add.tilemap('level1');
  map.addTilesetImage('tiles', 'tiles');

  layer = map.createLayer('background');
  console.log('layer', layer)

  //layer.resizeWorld();

  // Movement constants
  this.MAX_SPEED = 500;
  this.ACCELERATION = 1500;
  this.DRAG = 600;
  this.GRAVITY = 2600;
  this.JUMP_SPEED = -700;

  // Create & enable player sprite
  this.player = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'player');
  this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.body.collideWorldBounds = true;
  this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y
  this.player.body.drag.setTo(this.DRAG, 0); // x, y

  game.physics.arcade.gravity.y = this.GRAVITY;

  this.canDoubleJump = true;
  this.canVariableJump = true;
  this.ground = this.game.add.group();

  // for(var x = 0; x < this.game.width; x += 32) {
  //   // Add the ground blocks, enable physics on each, make them immovable
  //   var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
  //   this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
  //   groundBlock.body.immovable = true;
  //   groundBlock.body.allowGravity = false;
  //   this.ground.add(groundBlock);
  // }

  // Capture certain keys to prevent their default actions in the browser.
  // This is only necessary because this is an HTML5 game. Games on other
  // platforms may not need code like this.
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  // Show FPS
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
};


// The update() method is called every frame
GameState.prototype.update = function() {
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }

  // Collide the player with the ground
  this.game.physics.arcade.collide(this.player, this.ground);

  if (this.leftInputIsActive()) {
    // If the LEFT key is down, set the player velocity to move left
    this.player.body.acceleration.x = -this.ACCELERATION;
  } else if (this.rightInputIsActive()) {
    // If the RIGHT key is down, set the player velocity to move right
    this.player.body.acceleration.x = this.ACCELERATION;
  } else {
    this.player.body.acceleration.x = 0;
  }

  // Set a variable that is true when the player is touching the ground
  var onTheGround = this.player.body.touching.down;
  if (onTheGround) this.canDoubleJump = true;

  if (this.upInputIsActive(5)) {
    // Allow the player to adjust his jump height by holding the jump button
    if (this.canDoubleJump) this.canVariableJump = true;

    if (this.canDoubleJump || onTheGround) {
      // Jump when the player is touching the ground or they can double jump
      this.player.body.velocity.y = this.JUMP_SPEED;

      // Disable ability to double jump if the player is jumping in the air
      if (!onTheGround) this.canDoubleJump = false;
    }
  }

  // Keep y velocity constant while the jump button is held for up to 150 ms
  if (this.canVariableJump && this.upInputIsActive(150)) {
    this.player.body.velocity.y = this.JUMP_SPEED;
  }

  // Don't allow variable jump height after the jump button is released
  if (!this.upInputIsActive()) {
    this.canVariableJump = false;
  }
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.leftInputIsActive = function() {
  var isActive = false;

  isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x < this.game.width/4);

  return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.rightInputIsActive = function() {
  var isActive = false;

  isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
  isActive |= (this.game.input.activePointer.isDown &&
      this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

  return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
GameState.prototype.upInputIsActive = function(duration) {
  var isActive = false;

  isActive = this.input.keyboard.justPressed(Phaser.Keyboard.UP, duration);
  isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
      this.game.input.activePointer.x > this.game.width/4 &&
      this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

  return isActive;
};

var game = new Phaser.Game(640, 640, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
