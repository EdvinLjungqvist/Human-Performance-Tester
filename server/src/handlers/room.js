const Player = require("../utils/Player");
const Room = require("../utils/Room");

const rooms = new Map();

const roomHandler = (io, socket) => {
    const getCurrent = () => {
        for (const room of rooms.values()) {
            if (room.hasPlayer(socket.id)) {
                return room;
            }
        }
        return null;
    };

    const get = (callback) => {
        callback(getCurrent());
    };

    const getAll = (callback) => {
        callback(Array.from(rooms.values()));
    };

    const join = (data, callback) => {
        const { roomID, profile } = data;
        let room = null;

        if (rooms.has(roomID)) {
            room = rooms.get(roomID);
            room.addPlayer(new Player(socket.id, profile))
            console.log(`[Socket] ${socket.id} joined room ${room.id}!`);
        } else {
            rooms.set(roomID, room = new Room(roomID, [new Player(socket.id, profile)], socket.id));
            console.log(`[Socket] ${socket.id} created room ${room.id}!`);
        }
        socket.join(roomID);
        io.in(roomID).emit("room:get", room);
        io.emit("room:get-all", Array.from(rooms.values()));
        callback(true);
    };

    const leave = callback => {
        const room = getCurrent();

        if (room) {
            socket.leave(room.id);
            const host = room.hostID === socket.id;

            room.removePlayer(socket.id);

            io.in(room.id).emit("room:get", room);

            if (room.players.length === 0 || host) {
                rooms.delete(room.id);

                if (host) {
                    io.in(room.id).socketsLeave(room.id);
                    socket.broadcast.emit("room:leave-host");
                }
            }

            io.emit("room:get-all", Array.from(rooms.values()));
            callback(true);
            console.log(`[Socket] ${socket.id} left room ${room.id}!`);
        } else {
            callback(false);
        }
    };

    const disconnect = () => {
        leave(() => { });
    };

    socket.on("room:get", get);
    socket.on("room:get-all", getAll);
    socket.on("room:join", join);
    socket.on("room:leave", leave);
    socket.on("disconnect", disconnect);
};

module.exports = {
    roomHandler
};
