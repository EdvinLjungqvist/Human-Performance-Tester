class Player {
    constructor(socketID, profile) {
        this.socketID = socketID;
        this.profile = profile;
        this.score = 0;
    }
}

module.exports = Player;
