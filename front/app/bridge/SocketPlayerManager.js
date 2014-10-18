'use strict';

var id = null;

var SocketPlayerManager = function SocketPlayerManager(){
    this.position = {
      x: 0,
      y: 0
    };

    this.velocity = {
      x: 0,
      y: 0
    };
};

SocketPlayerManager.prototype.setPosition = function SocketPlayerManagerPosition(x, y){
    this.position.x = x;
    this.position.y = y;

    return this;
};

SocketPlayerManager.prototype.setVelocity = function SocketPlayerManagerVelocity(x, y){
    this.velocity.x = x;
    this.velocity.y = y;

    return this;
};

SocketPlayerManager.prototype.build = function SocketPlayerManagerBuild(){
    var state = {
      p: {
        x : this.position.x,
        y : this.position.y
      },
      v: {
        x : this.velocity.x,
        y : this.velocity.y
      }
    };

    return state;
};

SocketPlayerManager.prototype.setId = function SocketPlayerManagerSetId(newId){
    id = newId;
};

SocketPlayerManager.prototype.getId = function SocketPlayerManagerGetId(){
    return id;
};

module.exports = new SocketPlayerManager();
