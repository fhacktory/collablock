/**
 * Created by herzucco on 18/10/2014.
 */
var constants = require('./constants');
var Level = function Level(){

};

Level.prototype.init = function LevelInit(game){
    // Set stage background to something sky colored
    game.stage.backgroundColor = 0x98C8FF;

    this.physic = game.add.group();

    for(var x = 0; x < game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = game.add.sprite(x, game.height - 32, 'ground');
        game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.physic.add(groundBlock);
    }

    game.physics.arcade.gravity.y = constants.GRAVITY;
};

Level.prototype.update = function LevelUpdate(game){

};

module.exports = new Level();