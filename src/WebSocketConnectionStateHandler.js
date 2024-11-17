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

    if (
      parsedUrl.searchParams.has("jobId") &&
      parsedUrl.searchParams.has("path-tracing-job")
    ) {
      this.clients.addPathTracingClient(
        parsedUrl.searchParams.get("jobId"),
        ws
      );
      return;
    }

    this.clients.addClientToJob(jobId, ws);
  }

  handleConnectionClose(ws) {
    this.clients.removeClient(ws);
  }
}

module.exports = WebSocketConnectionStateHandler;
