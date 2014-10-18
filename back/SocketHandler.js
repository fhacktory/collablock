'use strict';


/**
 * Handle the socket connections.
 *
 * @class
 * @param {Socket.io} io - The listening object
 */

function SocketHandler(io) {

  io.on('connection', function(socket) {
    socket.emit('handshake', {
      timestamp: +(new Date())
    });
  });

}


module.exports = SocketHandler;
