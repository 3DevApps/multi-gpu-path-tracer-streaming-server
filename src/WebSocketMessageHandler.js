class WebSocketMessageHandler {
  constructor(clients) {
    this.clients = clients;
  }

  handleMessage(ws, rawMessage) {
    const jobId = ws._jobId;
    this.clients.getClients(jobId)?.forEach((client) => {
      if (client === ws) {
        return;
      }
      client.send(rawMessage);
    });
  }
}

module.exports = WebSocketMessageHandler;
