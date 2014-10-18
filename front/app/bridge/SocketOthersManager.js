/**
 * Created by herzucco on 18/10/2014.
 */

var players = {};
var newPlayers = {};
var newPlayersToShare = [];
var firstStates = true;
var SocketOthersManager = function SocketOthersManager(){

};

SocketOthersManager.prototype.getNews = function SocketOthersManagerHasNew(){
    //console.log("SocketOthersManager@getNews : newPlayers", newPlayers);

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


SocketOthersManager.prototype.getAll = function SocketOthersManagerHasNew(){
    return players;
};

SocketOthersManager.prototype.addNew = function SocketOthersManagerAddNew(id){
    if(Object.keys(players).indexOf(id) <= -1 && Object.keys(newPlayers).indexOf(id) <= -1){
        var nPlayer = this.buildNew(id);
        newPlayers[id] = nPlayer;
        newPlayersToShare.push(nPlayer);
    }
};

SocketOthersManager.prototype.buildNew = function SocketOthersManagerbuildNew(id){
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

SocketOthersManager.prototype.getPosition = function SocketOthersManagerGetPosition(id){
    return {
        x : players[id].position.x,
        y : players[id].position.y
    }
};

SocketOthersManager.prototype.getSpeed = function SocketOthersManagerGetSpeed(id){
    return {
        x : players[id].speed.x,
        y : players[id].speed.y
    }
};

SocketOthersManager.prototype.update = function SocketOthersManagerUpdate(data){
    var i;
    if(firstStates){
        firstStates = false;

        newPlayers = data;
        this.syncNewPlayers();

        return;
    }

    for(i in players){
        if(data[i] != undefined){
            console.log(data[i]);
            players[i] = data[i];
        }
    }
};

SocketOthersManager.prototype.syncNewPlayers = function SocketOthersManagerSyncNewPlayers(){
    var i;
    for(i in newPlayers){
        newPlayersToShare.push(newPlayers[i]);
    }
};

module.exports = new SocketOthersManager();
