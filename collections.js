function chunk(items, size) {
  if (!Array.isArray(items)) {
    throw new TypeError("Items must be an array");
  }
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("Size must be a positive integer");
  }

  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function unique(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("Items must be an array");
  }

  return [...new Set(items)];
}

function groupBy(items, getKey) {
  if (!Array.isArray(items)) {
    throw new TypeError("Items must be an array");
  }
  if (typeof getKey !== "function") {
    throw new TypeError("A key function is required");
  }

  return items.reduce((groups, item) => {
    const key = getKey(item);
    const group = groups.get(key) ?? [];
    group.push(item);
    groups.set(key, group);
    return groups;
  }, new Map());
}

if (require.main === module) {
  console.log("Chunks:", chunk([1, 2, 3, 4, 5], 2));
  console.log("Unique:", unique(["red", "blue", "red"]));
  console.log(
    "Grouped:",
    Object.fromEntries(groupBy(["ant", "bear", "cat"], (word) => word.length)),
  );
}

module.exports = { chunk, groupBy, unique };
