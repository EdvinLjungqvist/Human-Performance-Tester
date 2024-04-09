const Player = require("../utils/Player");
const Room = require("../utils/Room");

const rooms = new Map();

const roomHandler = (io, socket) => {
    const get = (callback) => {
        callback(socket.room);
    };

    const getAll = (callback) => {
        callback(Array.from(rooms.values()));
    };

    const join = (data, callback) => {
        const { roomID, profile } = data;

        if (!hasProfile(profile.id)) {
            let room = null;

            if (rooms.has(roomID)) {
                room = rooms.get(roomID);
                room.addPlayer(new Player(socket.id, profile))
                console.log(`[Socket] ${socket.id} joined room ${room.id}!`);
            } else {
                rooms.set(roomID, room = new Room(roomID, [new Player(socket.id, profile)], socket.id));
                console.log(`[Socket] ${socket.id} created room ${room.id}!`);
            }
            socket.room = room;
            socket.join(roomID);
            io.in(roomID).emit("room:get", room);
            io.emit("room:get-all", Array.from(rooms.values()));
            callback({
                success: true,
                message: "Successfully joined room!"
            });
        } else {
            callback({
                success: false,
                message: "Profile is already in this room!"
            });
            console.log(`[Socket] ${socket.id} failed to join ${roomID}!`);
        }
    };

    const leave = callback => {
        const room = socket.room;

        if (room) {
            const host = room.hostID === socket.id;

            socket.leave(room.id);
            room.removePlayer(socket.id);
            io.in(room.id).emit("room:get", room);

            if (room.players.length === 0 || host) {
                rooms.delete(room.id);

                if (host) {
                    io.in(room.id).socketsLeave(room.id);
                    socket.broadcast.emit("room:leave-host");
                }
            }
            delete socket.room;

            io.emit("room:get-all", Array.from(rooms.values()));
            callback({
                success: true,
                message: "Successfully left room!"
            });
            console.log(`[Socket] ${socket.id} left room ${room.id}!`);
        } else {
            callback({
                success: false,
                message: "You are already in a room!"
            });
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

const hasProfile = (profileID) => {
    for (const room of rooms.values()) {
        for (const player of room.players) {
            if (player.profile.id === profileID) {
                return true;
            }
        }
    }
    return false;
};

module.exports = {
    roomHandler
};
