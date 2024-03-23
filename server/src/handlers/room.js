const profiles = new Map();

const roomHandler = (io, socket) => {
    const get = (callback) => {
        callback({
            id: "myCoolId"
        });
        callback(null);
    };

    const join = (roomID, profile) => {
        socket.join(roomID);
        profiles.set(socket.id, profile);
    };

    const leave = () => {
        socket.leaveAll();
        profiles.delete(socket.id);
    };

    socket.on("room:get", get);
    socket.on("room:join", join);
    socket.on("room:leave", leave);
};

module.exports = {
    roomHandler
};
