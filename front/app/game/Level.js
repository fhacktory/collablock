/**
 * Created by herzucco on 18/10/2014.
 */

var constants = require('./constants');
var SocketManager = require('../bridge/SocketsManager');
var Level = function Level(){

};

var levelLoaded = false;
var map;
var layer;

Level.prototype.init = function LevelInit(game){
    // Set stage background to something sky colored
    game.stage.backgroundColor = 0x98C8FF;

    this.physic = game.add.group();

    for(var x = 0; x < game.width; x += 32) {
        var groundBlock = game.add.sprite(x, game.height - 32, '');
        game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.physic.add(groundBlock);
    }

    game.physics.arcade.gravity.y = constants.GRAVITY;
};

Level.prototype.update = function LevelUpdate(game){
  if(levelLoaded === false && SocketManager.level.data !== undefined) {

    game.load.tilemap('level1', null, SocketManager.level.data, Phaser.Tilemap.TILED_JSON);

    // Load map
    map = game.add.tilemap('level1');
    map.addTilesetImage('tiles');

    layer = map.createLayer('background');
    layer.resizeWorld();

    levelLoaded = true;
  }
};

module.exports = new Level();
