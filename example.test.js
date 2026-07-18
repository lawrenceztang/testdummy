const test = require("node:test");
const assert = require("node:assert/strict");

const { greet, greetAll } = require("./example");

test("greets the world by default", () => {
  assert.equal(greet(), "Hello, World!");
});

test("greets a supplied name", () => {
  assert.equal(greet("Relay"), "Hello, Relay!");
});

test("rejects an empty name", () => {
  assert.throws(() => greet("  "), /must not be empty/);
});

test("greets multiple names", () => {
  assert.deepEqual(greetAll(["Ada", "Grace"]), [
    "Hello, Ada!",
    "Hello, Grace!",
  ]);
});

test("requires an array of names", () => {
  assert.throws(() => greetAll("Ada"), /must be an array/);
});
