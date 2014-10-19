'use strict';

var constants = require('./constants');
var SocketManager = require('../bridge/SocketsManager');
var PlayersPool = require('./PlayersPool');

var Level = function Level(){

};

var levelLoaded = false;
var players;
var solidLayer;

Level.prototype.init = function LevelInit(game){
    // Set stage background to something sky colored
    game.stage.backgroundColor = constants.BACKGROUND;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Enable gravity
    game.physics.arcade.gravity.y = constants.GRAVITY;
};

Level.prototype.update = function LevelUpdate(game, player){
  if(levelLoaded === false && SocketManager.level.data !== undefined) {

    this.loader = game.load.tilemap('level1', null, SocketManager.level.data, Phaser.Tilemap.TILED_JSON);
    // Load map
    var map = game.add.tilemap('level1');
    map.addTilesetImage('tiles');
    map.setCollisionBetween(1, 300);

    this.layer = map.createLayer('background');
    this.layer.resizeWorld();
    player.init(game);
    // Add collision
      /*var test = new Phaser.BitmapData(game, "color_player", 32, 32);

      test.context.fillStyle = "red";
      test.context.fillRect(0, 0, 32, 32);*/

    /*this.physic = game.add.group();
      this.physic.enableBody = true;
    map.createFromObjects('solid', 42, test, 0,
                          true, false, this.physic);*/

      //console.log(this.physic.children);
    levelLoaded = true;
  }
};

Level.prototype.loadNext = function(player){
    SocketManager.level.data = undefined;
    levelLoaded = false;
    SocketManager.emitLevel();

    //unload level here

    player.reset();
};

module.exports = new Level();
console.log(module.exports);
