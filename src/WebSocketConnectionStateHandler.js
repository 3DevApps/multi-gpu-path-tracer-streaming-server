class WebSocketConnectionStateHandler {
  constructor(clients) {
    this.clients = clients;
  }

  handleNewConnection(ws, req) {
    const parsedUrl = new URL(req.url, "http://com.example");

    const jobId = parsedUrl.searchParams.get("jobId");

    if (!jobId) {
      ws.close();
      return;
    }

    ws._jobId = jobId;

    this.clients.addClientToJob(jobId, ws);
  }

  handleConnectionClose(ws) {
    this.clients.removeClient(ws);
  }
}

module.exports = WebSocketConnectionStateHandler;
