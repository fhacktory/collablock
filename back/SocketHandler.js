'use strict';

var levels = require('./levels');


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
    level: levels.getFirst()
  };

  /**
   * Called on each new user connection.
   */

  io.on('connection', function(socket) {

    var user = {
      id: (lastId += 1)
    };

    // give the information which could be useful when a user just arrives in a
    // game
    socket.emit('handshake', {
      user: user,
      game: game,
      states: states
    });

    // inform the other users
    socket.broadcast.emit('new_player', user);

    // emit all the levels name/data
    for (var levelName in levels) {
      if (levels.hasOwnProperty(levelName)) {
        socket.emit('level', {
          name: levelName,
          data: levels[levelName]
        });
      }
    }

    /**
     * Called when a player sends its position/velocity.
     */

    socket.on('state', function(data) {

      // save the user state
      states[user.id] = data;

      // broadcast the user state
      socket.broadcast.emit('state', states[user.id]);

    });

    /**
     * Called when a player finishes a level.
     */

    socket.on('level_finished', function() {

      var nextLevelName = levels.getNextKey();

      if (typeof nextLevelName === 'string') {
        socket.broadcast.emit('current_level', {
          name: nextLevelName
        });
      } else {
        socket.broadcast.emit('no_more_levels');
      }

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
