class Room {
    constructor(id, players, hostID) {
        this.id = id;
        this.players = players;
        this.hostID = hostID
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(socketID) {
        this.players.splice(this.players.findIndex(player => player.socketID === socketID), 1);
    }

    hasPlayer(socketID) {
        return this.players.some(player => player.socketID === socketID);
    }
}

module.exports = Room;
