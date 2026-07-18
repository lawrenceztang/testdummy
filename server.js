const http = require("node:http");

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let body = "";

  for await (const chunk of request) {
    body += chunk;
  }

  return JSON.parse(body);
}

function createServer() {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, { status: "ok" });
      return;
    }

    if (request.method === "GET" && url.pathname === "/greet") {
      const name = url.searchParams.get("name")?.trim();

      if (!name) {
        sendJson(response, 400, { error: "A name is required" });
        return;
      }

      sendJson(response, 200, { message: `Hello, ${name}!` });
      return;
    }

    if (request.method === "POST" && url.pathname === "/echo") {
      try {
        sendJson(response, 200, { data: await readJson(request) });
      } catch {
        sendJson(response, 400, { error: "Invalid JSON" });
      }
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
