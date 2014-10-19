'use strict';

var constants = require('./constants');
var SocketManager = require('../bridge/SocketsManager');

var Level = function Level(){

};

var levelLoaded = false;
var lastName;
Level.prototype.init = function LevelInit(game){
    // Set stage background to something sky colored
    game.stage.backgroundColor = constants.BACKGROUND;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Enable gravity
    game.physics.arcade.gravity.y = constants.GRAVITY;
};

Level.prototype.update = function LevelUpdate(game, player){
  if(levelLoaded === false && SocketManager.level.currentData !== undefined) {

    this.loader = game.load.tilemap('level1', null, SocketManager.level.currentData, Phaser.Tilemap.TILED_JSON);
    // Load map
    this.map = game.add.tilemap('level1');
    this.map.addTilesetImage('tiles');


    this.layer = this.map.createLayer('background');
    this.layer.resizeWorld();

    this.end = this.map.createLayer('end');
    this.end.resizeWorld(); 
    var o;
    for(var i = 0; i < SocketManager.level.currentData.layers.length; i++){
      var t = SocketManager.level.currentData.layers[i];
      if(t.name === "end"){
        o = t;
      }
    }
    var count = 0;
    for(var i = 0; i < o.data.length; i++){
      if(o.data[i] === 105){
        count++;
      }
    }
    this.endMax = count;
    console.log(count);

    this.map.setCollisionBetween(10, 80);
    this.map.setCollisionBetween(95, 1000);
    this.map.setCollision(105, true, this.end);

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
    lastName = SocketManager.level.currentName;
  }
    if(lastName !== SocketManager.level.currentName){
        console.log('changing level');
        levelLoaded = false;

        this.map.removeAllLayers();
        this.layer = null;
        this.end = null;
    }
};

Level.prototype.loadNext = function(player){
    SocketManager.level.currentData = undefined;
    levelLoaded = false;
    SocketManager.emitLevel();

    this.map.removeAllLayers();
    this.layer = null;
    this.end = null;

    //unload level here
    player.reset();
};

module.exports = new Level();
console.log(module.exports);
