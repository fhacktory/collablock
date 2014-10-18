'use strict';

var levels = {};

var SocketLevelManager = function SocketLevelManager(){
  console.log('in manager');
};

SocketLevelManager.prototype.setLevel = function SocketLevelManagerSetLevel(level){
    return level;
};

module.exports = new SocketLevelManager();
