const test = require("node:test");
const assert = require("node:assert/strict");

const { chunk, groupBy, unique } = require("./collections");

test("splits an array into fixed-size chunks", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test("requires a positive integer chunk size", () => {
  assert.throws(() => chunk([1, 2], 0), /positive integer/);
});

test("removes duplicate values while preserving order", () => {
  assert.deepEqual(unique(["red", "blue", "red"]), ["red", "blue"]);
});

test("groups values using a key function", () => {
  assert.deepEqual(
    groupBy(["ant", "bear", "cat"], (word) => word.length),
    new Map([
      [3, ["ant", "cat"]],
      [4, ["bear"]],
    ]),
  );
});

test("requires an array for each collection utility", () => {
  assert.throws(() => chunk("abc", 2), /must be an array/);
  assert.throws(() => unique("abc"), /must be an array/);
  assert.throws(() => groupBy("abc", String), /must be an array/);
});

test("requires a grouping key function", () => {
  assert.throws(() => groupBy([1, 2]), /key function/);
});
