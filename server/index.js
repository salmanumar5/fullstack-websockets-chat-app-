const express = require('express');
const connectDB = require('./lib/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app, server } = require("./lib/socket");
const path = require("path");

dotenv.config();

const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');

const PORT = process.env.PORT || 5002;

app.use(express.json({ limit: "10mb" })); // Adjust the size as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (res, req) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    })
}

server.listen(PORT, ()=> {
    console.log('Server listening on port: ', PORT);
    connectDB()
})