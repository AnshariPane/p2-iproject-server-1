if (process.env.NODE !== "production") {
    require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./routes");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const { Server } = require("socket.io");
const { SocketChatLog } = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://myvtuberlist-f0b27.web.app/",
        allowedHeaders: ["MY-CUSTOM-HEADERS"],
        credentials: true,
        methods: ["GET", "POST"],
    },
    allowEIO3: true,
    transports: ["websocket", "polling"],
});

io.on("connection", async (socket) => {
    let logs = []
    try {
        const chatLogs = await SocketChatLog.findAll({
            order : [
                ["id", "DESC"]
            ]
        });
        logs = chatLogs
        io.emit('groupChat', chatLogs)
    } catch (error) {
        console.log(error);
    }
    socket.on("groupChat", async (msg) => {

        console.log("message: " + msg);
        const payload = {
            message: msg,
        };
        try {
            logs.push(payload)
            await SocketChatLog.create(payload);
            io.emit('groupChat', logs)
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(8081, () => {
    console.log("listening on 8081");
});

app.listen(port, () => {
    console.log(`listening on port, ${port}`);
});
