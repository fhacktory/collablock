'use strict';

var _ = require('lodash');

var levels = require('./levels');
var utils = require('./utils');


/**
 * Handle the socket connections.
 *
 * @class
 * @param {Socket.io} io - The listening object
 */

function SocketHandler(io) {

  /**
   * Keep track of the last given id. Numbers are used so as to minimize the
   * packets size.
   *
   * @type {Number}
   */

  var lastId = 0;

  /**
   * Store the current state for all the players. The keys correspond to the
   * user ids, the value to their respective state.
   *
   * @type {Object}
   */

  var states = {};

  /**
   * Store the current game information (current level, etc)
   *
   * @type {Object}
   * @type {String} game.level - the name of the current level
   */

  var game = {
    level: {
      name: levels.getFirstKey(),
      data: levels.getFirst()
    }
  };

  /**
   * Called on each new user connection.
   */

  io.on('connection', function(socket) {

    var user = {};
    user.id = (lastId += 1);
    user.color = utils.getColorFromNumber(user.id);

    // give the information which could be useful when a user just arrives in a
    // game
    socket.emit('handshake', {
      user: user,
      game: game,
      states: _(_.cloneDeep(states))
        .forEach(function(value) {
          value.color = utils.getColorFromNumber(value.id);
        })
        .value()
    });

    // inform the other users
    socket.broadcast.emit('new_player', user);

    /**
     * Called when a player sends its position/velocity.
     */

    socket.on('state', function(data) {

      // save the user state
      data.id = user.id;
      states[user.id] = data;

      // broadcast the user state
      socket.broadcast.emit('state', states[user.id]);

    });

    /**
     * Called when a player finishes a level.
     */

    socket.on('level_finished', function() {

      var nextLevelName = levels.getNextKey(game.level.name);

      if (typeof nextLevelName === 'string') {
        game.level = {
          name: nextLevelName,
          data: levels[nextLevelName]
        };
      } else {
        game.level = {
          name: levels.getFirstKey(),
          data: levels.getFirst()
        };
      }
      io.emit('current_level', game.level);

    });

    /**
     * Called when the user disconnects.
     */

    socket.on('disconnect', function() {

      // delete the user state
      delete states[user.id];

      // notify the others users
      io.emit('player_left', user);

    });

  });

}


module.exports = SocketHandler;
