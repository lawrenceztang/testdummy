const http = require("node:http");

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

function createServer() {
  return http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { status: "ok" });
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT ?? 3000);
  const server = createServer();

  server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = { createServer };
