/**
 * Created by herzucco on 18/10/2014.
 */
var Keyboard = function Keyboard(){

};

Keyboard.prototype.init = function keyBoardInit(game){
    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
Keyboard.prototype.leftInputIsActive = function(game) {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);

    return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
Keyboard.prototype.rightInputIsActive = function(game) {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

    return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
Keyboard.prototype.upInputIsActive = function(game, duration) {
    var isActive = false;

    isActive = game.input.keyboard.justPressed(Phaser.Keyboard.UP, duration);

    return isActive;
};

module.exports = new Keyboard();