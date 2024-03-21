require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const statsRouter = require("./routes/stats");
const { errorLogger, errorHandler } = require("./middlewares/error");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/stats", statsRouter);
app.use(errorLogger, errorHandler);

const { createServer } = require("http");

const server = createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

const { roomHandler } = require("./handlers/room");
const { gameHandler } = require("./handlers/game");

io.on("connection", (socket) => {
    roomHandler(io, socket);
    gameHandler(io, socket);

    socket.on("disconnect", () => {
        console.log(`[Socket] ${socket.id} disconnected!`);
    });
    console.log(`[Socket] ${socket.id} connected!`);
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

server.listen(PORT, HOST, () => {
    console.log(`[Server] Running on ${HOST}:${PORT}`);
});
