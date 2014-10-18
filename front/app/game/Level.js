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
    game.stage.backgroundColor = 0x6c8c87;

    // Enable gravity
    game.physics.arcade.gravity.y = constants.GRAVITY;
};

Level.prototype.update = function LevelUpdate(game, player){
  if(levelLoaded === false && SocketManager.level.data !== undefined) {

    game.load.tilemap('level1', null, SocketManager.level.data, Phaser.Tilemap.TILED_JSON);

    // Load map
    var map = game.add.tilemap('level1');
    map.addTilesetImage('tiles');

    var layer = map.createLayer('background');
    layer.resizeWorld();

    // Add collision
    this.physic = game.add.group();
    map.createFromObjects('solid', 42, '', 0,
                          true, false, this.physic);

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
