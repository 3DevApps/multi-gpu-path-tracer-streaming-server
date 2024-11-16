const WebSocketClientHandler = require("./src/WebSocketClientHandler.js");
const WebSocketMessageHandler = require("./src/WebSocketMessageHandler.js");

const clients = new WebSocketClientHandler();
const messageHandler = new WebSocketMessageHandler(clients);

module.exports = {
  clients,
  messageHandler,
};
