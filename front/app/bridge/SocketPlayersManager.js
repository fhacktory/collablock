'use strict';

var players = {};
var newPlayers = {};
var newPlayersToShare = [];
var toRemove = [];
var SocketPlayersManager = function SocketPlayersManager(){

};

SocketPlayersManager.prototype.getNews = function SocketPlayersManagerHasNew(){
    var toReturn = [];
    var i;

    for(i = 0; i < newPlayersToShare.length; i++){
        if(players[newPlayersToShare[i].player.id] === undefined){
            players[newPlayersToShare[i].player.id] = newPlayersToShare[i];
        }

        toReturn.push(newPlayersToShare[i]);
    }

    newPlayersToShare.length = 0;
    newPlayers = {};

    return toReturn;
};


SocketPlayersManager.prototype.getAll = function SocketPlayersManagerGetAll(){
    return players;
};

SocketPlayersManager.prototype.addNew = function SocketPlayersManagerAddNew(id){
    if(Object.keys(players).indexOf(id) <= -1 && Object.keys(newPlayers).indexOf(id) <= -1){
        var nPlayer = this.buildNew(id);
        newPlayers[id] = nPlayer;
        newPlayersToShare.push(nPlayer);
    }
};

SocketPlayersManager.prototype.buildNew = function SocketPlayersManagerBuildNew(id){
    return {
        player : {
            position : {
                x : 0,
                y : 0
            },
            speed : {
                x : 0,
                y : 0
            },
            id : id
        }
    };
};

SocketPlayersManager.prototype.getPosition = function SocketPlayersManagerGetPosition(id){
    return {
        x : players[id].position.x,
        y : players[id].position.y
    };
};

SocketPlayersManager.prototype.getSpeed = function SocketPlayersManagerGetSpeed(id){
    return {
        x : players[id].speed.x,
        y : players[id].speed.y
    };
};

SocketPlayersManager.prototype.update = function SocketPlayersManagerUpdate(data){
    if(players[data.player.id]){
        players[data.player.id] = data;
    }
};

SocketPlayersManager.prototype.syncNewPlayers = function SocketPlayersManagerSyncNewPlayers(data){
    newPlayers = data;

    var i;
    for(i in newPlayers){
      if (newPlayers.hasOwnProperty(i)) {
        newPlayersToShare.push(newPlayers[i]);
      }
    }
};

SocketPlayersManager.prototype.remove = function SocketPlayersManagerRemove(id){
    console.log('preaparing remove', id);
    toRemove.push(id);
};

SocketPlayersManager.prototype.getRemove = function SocketPlayersManagerRemove(){
    var toReturn = [];
    var i;

    for(i = 0; i < toRemove.length; i++){
        toReturn.push(toRemove[i]);
        delete players[toRemove[i]];
        delete newPlayers[toRemove[i]];
    }

    toRemove.length = 0;
    return toReturn;
};

module.exports = new SocketPlayersManager();
