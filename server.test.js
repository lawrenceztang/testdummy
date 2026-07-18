const test = require("node:test");
const assert = require("node:assert/strict");

const { createServer } = require("./server");

async function withServer(callback) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  try {
    const { port } = server.address();
    await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("reports a healthy status", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });
});

test("returns JSON for unknown routes", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/missing`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Not found" });
  });
});

test("greets a name supplied in the query string", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/greet?name=Ada%20Lovelace`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { message: "Hello, Ada Lovelace!" });
  });
});

test("requires a name when greeting", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/greet?name=%20`);

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "A name is required" });
  });
});
