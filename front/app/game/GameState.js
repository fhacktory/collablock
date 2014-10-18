var PlayersPool = require('./PlayersPool');
var Player = require('./Player');
var Level = require('./Level');

/**
 * Start Game stage
 */
var GameState = function(game) {};

// Setup Game
GameState.prototype.create = function() {
    PlayersPool.init(this);
    Player.init(game);

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.leftInputIsActive = function() {

};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.rightInputIsActive = function() {

};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
GameState.prototype.upInputIsActive = function(duration) {

};

// The update() method is called every frame
GameState.prototype.update = function() {
    PlayersPool.update(this);
    Player.update(this);
    Level.update(this);
};

var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);

module.exports = game;
