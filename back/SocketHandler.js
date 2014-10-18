'use strict';

var uuid = require('uuid');

var levels = require('./levels');


/**
 * Handle the socket connections.
 *
 * @class
 * @param {Socket.io} io - The listening object
 */

function SocketHandler(io) {

  /**
   * Store the different states of the game (level, players...).
   */

  var states = {

    players: {}
  };

  // send the states on a regular time basis
    (function broadcast(){
      process.nextTick(function() {
          io.emit('states', states);
          setTimeout(broadcast, 30);
      });

  })();

  /**
   * Called on each new user connection.
   */

  io.on('connection', function(socket) {

    var user = {
      id: uuid.v4()
    };

    // give the user its information
    socket.emit('handshake', user);

    // inform the other users
    socket.broadcast.emit('new_player', user);

    // emit all the levels
    for (var levelName in levels) {
      if (levels.hasOwnProperty(levelName)) {
        socket.emit('level', {
          name: levelName,
          data: levels[levelName]
        });
      }
    }

    /**
     * Called when a player sends its position.
     */

    socket.on('state', function(data) {

      // store the user state
      data.player.id = user.id;
      states.players[user.id] = data;

    });

    /**
     * Called when a player finishes a level.
     */

    socket.on('level_finished', function() {
    });

    /**
     * Called when the user disconnects.
     */

    socket.on('disconnect', function() {

      // delete the user state
      delete states.players[user.id];

      io.emit('player_left', user);

    });

  });

}


module.exports = SocketHandler;
