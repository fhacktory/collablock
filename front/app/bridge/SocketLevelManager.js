'use strict';

var SocketLevelManager = function SocketLevelManager(){
    this.data = undefined;
};

SocketLevelManager.prototype.setLevel = function SocketLevelManagerSetLevel(level){
    this.data = level;
    return this;
};


module.exports = new SocketLevelManager();
