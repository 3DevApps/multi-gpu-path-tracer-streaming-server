const WebSocketMessageUtils = require("./WebSocketMessageUtils");

class WebSocketMessageHandler {
  constructor(clients) {
    this.clients = clients;
  }

  handleMessage(ws, rawMessage) {
    const message = WebSocketMessageUtils.parseMessage(rawMessage);
    if (!message) {
      return;
    }
    const type = message[0];
    const jobId = ws._jobId;
    switch (type) {
      case "JOB_MESSAGE":
        this.clients.getClients(jobId)?.forEach((client) => {
          if (message[1] === "RENDER" || message[1] === "SNAPSHOT") {
            client.send(rawMessage.slice(12));
          } else {
            client.send(WebSocketMessageUtils.encodeMessage(message.slice(1)));
          }
        });
        break;
      case "CLIENT_MESSAGE":
        if (!this.clients.isAdmin(jobId, ws)) {
          return;
        }
        this.clients
          .getPathTracingClients(jobId)
          ?.forEach((client) =>
            client.send(WebSocketMessageUtils.encodeMessage(message.slice(1)))
          );
        break;
      default:
        break;
    }
  }
}

module.exports = WebSocketMessageHandler;
