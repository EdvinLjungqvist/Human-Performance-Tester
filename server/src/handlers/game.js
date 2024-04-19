const gameHandler = (io, socket) => {
    const start = (game, callback) => {
        const room = socket.room;

        if (room) {
            if (room.hostID === socket.id) {
                io.emit("game:start", {
                    success: true,
                    message: "The game has started!"
                });
                io.emit("game:get", game);
                console.log(`[Socket] ${socket.id} started game ${game} in room ${room.id}!`);
            } else {
                callback({
                    success: false,
                    message: "You are not the host!"
                });
            }
        } else {
            callback({
                success: false,
                message: "You are not in a room!"
            });
        }
    };

    const end = () => {
        const room = socket.room;

        if (room) {
            if (room.hostID === socket.id) {
                const winner = getWinner(room.players);

                for (const player of room.players) {
                    player.score = 0;
                }
                io.emit("game:end", winner);
                io.in(room.id).emit("room:get", room);
            }
        }
    };

    const score = score => {
        const room = socket.room;

        if (room) {
            const player = getPlayer(socket);
            const currentScore = player.score;

            if (score > currentScore) {
                player.score = score;
                io.in(room.id).emit("room:get", socket.room);
            }
        }
    };

    socket.on("game:start", start);
    socket.on("game:end", end);
    socket.on("game:score", score);
};

const getPlayer = socket => {
    const room = socket.room;

    for (const player of room.players) {
        if (player.socketID === socket.id) {
            return player;
        }
    }
    return null;
};

const getWinner = players => {
    let winner = null;
    let winnerScore = -1;

    for (const player of players) {
        if (player.score > winnerScore) {
            winner = player;
            winnerScore = player.score;
        }
    }
    return winner;
};

module.exports = {
    gameHandler
};
