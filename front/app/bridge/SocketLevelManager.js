'use strict';

var SocketLevelManager = function SocketLevelManager(){
    this.data = {};
    this.currentData = undefined;
    this.currentName = undefined;
};

SocketLevelManager.prototype.setLevel = function SocketLevelManagerSetLevel(name){
    this.currentData = this.data[name];
    this.currentName = name;
    return this;
};

SocketLevelManager.prototype.addLevel = function SocketLevelManagerAddLevel(level){
    this.data[level.name] = level.data;
    return this;
};


module.exports = new SocketLevelManager();
