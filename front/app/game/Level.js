/**
 * Created by herzucco on 18/10/2014.
 */
var Level = function Level(){

};

Level.prototype.init = function LevelInit(game){
    // Set stage background to something sky colored
    game.stage.backgroundColor = 0x98C8FF;

    this.ground = game.add.group();
    var groundBlock = game.add.sprite(game.w, game.height - 32, '');

    for(var x = 0; x < game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = game.add.sprite(x, game.height - 32, '');
        gamephysics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }
};

Level.prototype.update = function LevelUpdate(game){

};

module.exports = new Level();