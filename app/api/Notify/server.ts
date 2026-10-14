
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Company connected:", socket.id);

    socket.on("company-join", () => {
        socket.join("company");
        console.log("Company joined notification room");
    });

    socket.on("disconnect", () => {
        console.log("Company disconnected:", socket.id);
    });
});

app.post("/notify-contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    io.to("company").emit("new-contact", {
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
        message: "Notification sent successfully",
    });
});

server.listen(5001, () => {
    console.log("Notification server running on port 5001");
});