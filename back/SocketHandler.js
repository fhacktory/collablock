'use strict';

var uuid = require('uuid');


/**
 * Handle the socket connections.
 *
 * @class
 * @param {Socket.io} io - The listening object
 */

function SocketHandler(io) {

  /**
   * The states of all the users.
   */

  var states = {
    players: {}
  };

  // send the users position on a regular time basis
  setInterval(function() {
    io.emit('states', states);
  }, 10/*ms*/);

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

    /**
     * Called when a player sends its position.
     */

    socket.on('state', function(data) {

      // store the user state
      data.player.id = user.id;
      states.players[user.id] = data;

    });

    /**
     * Called when the user disconnects.
     */

    socket.on('disconnect', function() {

      // delete the user state
      delete states.players[user.id];

      io.emit('player_leaved', user);

    });

  });

}


module.exports = SocketHandler;
