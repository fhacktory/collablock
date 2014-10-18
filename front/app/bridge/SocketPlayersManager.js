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
        if(players[newPlayersToShare[i].id] === undefined){
            players[newPlayersToShare[i].id] = newPlayersToShare[i];
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
        var newPlayer = this.buildNew(id);
        newPlayers[id] = newPlayer;
        newPlayersToShare.push(newPlayer);
    }
};

SocketPlayersManager.prototype.buildNew = function SocketPlayersManagerBuildNew(id){
    return {
      id: id,
      p: {
        x : 0,
        y : 0
      },
      v: {
        x : 0,
        y : 0
      }
    };
};

SocketPlayersManager.prototype.getPosition = function SocketPlayersManagerGetPosition(id){
    return players[id].p;
};

SocketPlayersManager.prototype.getVelocity = function SocketPlayersManagerGetVelocity(id){
    return players[id].v;
};

SocketPlayersManager.prototype.update = function SocketPlayersManagerUpdate(data){
    if(players[data.id]){
        players[data.id] = data;
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
