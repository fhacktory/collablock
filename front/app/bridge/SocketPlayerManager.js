'use strict';

var id = null;
var color = null;
var SocketPlayerManager = function SocketPlayerManager(){
    this.p = {
      x: 0,
      y: 0
    };

    this.v = {
      x: 0,
      y: 0
    };
};

SocketPlayerManager.prototype.setPosition = function SocketPlayerManagerPosition(x, y){
    this.p.x = x;
    this.p.y = y;

    return this;
};

SocketPlayerManager.prototype.setVelocity = function SocketPlayerManagerVelocity(x, y){
    this.v.x = x;
    this.v.y = y;

    return this;
};

SocketPlayerManager.prototype.build = function SocketPlayerManagerBuild(){
    var state = {
      p: {
        x : this.p.x,
        y : this.p.y
      },
      v: {
        x : this.v.x,
        y : this.v.y
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

SocketPlayerManager.prototype.setColor = function SocketPlayerManagerSetColor(newColor){
    color = newColor;
};

SocketPlayerManager.prototype.getColor = function SocketPlayerManagerGetColor(){
    return color;
};

module.exports = new SocketPlayerManager();
