'use strict';

var id = null;

var SocketPlayerManager = function SocketPlayerManager(){
    this.x = 0;
    this.y = 0;

    this.speedX = 0;
    this.speedY = 0;
};

SocketPlayerManager.prototype.position = function SocketPlayerManagerPosition(x, y){
    this.x = x;
    this.y = y;

    return this;
};

SocketPlayerManager.prototype.speed = function SocketPlayerManagerSpeed(x, y){
    this.speedX = x;
    this.speedY = y;

    return this;
};

SocketPlayerManager.prototype.build = function SocketPlayerManagerBuild(){
    var state = {
        player : {
            position : {
                x : this.x,
                y : this.y
            },
            speed : {
                x : this.speedX,
                y : this.speedY
            }
        }
    };

    return state;
};

SocketPlayerManager.prototype.setId = function SocketPlayerManagerSetId(nId){
    id = nId;
};

SocketPlayerManager.prototype.getId = function SocketPlayerManagerGetId(){
    return id;
};

module.exports = new SocketPlayerManager();
