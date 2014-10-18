'use strict';

var players = {};
var newPlayers = {};
var newPlayersToShare = [];
var firstStates = true;
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
    var i;
    if(firstStates){
        firstStates = false;

        newPlayers = data;
        this.syncNewPlayers();

        return;
    }

    for(i in players){
        if(data[i] != undefined){
            players[i] = data[i];
        }
    }
};

SocketPlayersManager.prototype.syncNewPlayers = function SocketPlayersManagerSyncNewPlayers(){
    var i;
    for(i in newPlayers){
      if (newPlayers.hasOwnProperty(i)) {
        newPlayersToShare.push(newPlayers[i]);
      }
    }
};

module.exports = new SocketPlayersManager();
