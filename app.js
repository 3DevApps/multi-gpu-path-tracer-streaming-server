require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const cors = require("cors");
const WebSocketServer = require("ws").WebSocketServer;
const WebSocketConnectionStateHandler = require("./src/WebSocketConnectionStateHandler.js");
const { clients, messageHandler } = require("./instances.js");
const http = require("http");

const PORT = process.env.NODE_ENV === "production" ? 50451 : 8080;

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const connectionStateHandler = new WebSocketConnectionStateHandler(clients);

wss.on("connection", (ws, req) => {
  connectionStateHandler.handleNewConnection(ws, req);
  ws.on("message", (message) => messageHandler.handleMessage(ws, message));
  ws.on("close", () => connectionStateHandler.handleConnectionClose(ws));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
