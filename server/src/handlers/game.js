const games = new Map();

const gameHandler = (io, socket) => {
    const start = (data, callback) => {
        const room = socket.room;

        if (room) {
            if (room.hostID === socket.id) {
                games.set(room.id, "game");
                callback(true);
                
                console.log(`[Socket] ${socket.id} started game ${data} in room ${room.id}!`);
            } else {
                callback(false);
            }
        }
    };

    socket.on("game:start", start);
};

module.exports = {
    gameHandler
};
