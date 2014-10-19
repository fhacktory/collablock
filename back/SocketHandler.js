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

      nextLevel();

    });

    (function() {

      /**
       * Represent the end boxes.
       *
       * @type {Number[]}
       */

      var end = {};

      /**
       * Called when a player touches/untouches a end box.
       */

      socket.on('end_touched', function(data) {
        console.log('touched');
        var id = data.id;
        var max = data.max;

        end[id] = (typeof end[id] === 'number') ? (end[id] + 1) : 0;

        // Count the ids where it is at least one user on it
        var count = Object.keys(end).reduce(function(acc, endKey) {
          if (end[endKey] > 0) { acc += 1; }
          return acc;
        }, 0);

        console.log('count', count, 'max', max)
        if (count >= max) {
          end = {};
          nextLevel();
        }
      });

      socket.on('end_untouched', function(data) {
        console.log('untouched');
        var id = data.id;

        end[id] = (typeof end[id] === 'number') ? (end[id] - 1) : 0;

        if (end[id] < 0) { end[id] = 0; }
      });

    })();

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

  /**
   * Switch to the next level.
   */

  function nextLevel() {
    console.log('next level');

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

  }

}


module.exports = SocketHandler;
