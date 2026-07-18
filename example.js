function greet(name = "World") {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new TypeError("Name must not be empty");
  }

  return `Hello, ${trimmedName}!`;
}

function greetAll(names) {
  if (!Array.isArray(names)) {
    throw new TypeError("Names must be an array");
  }

  return names.map((name) => greet(name));
}

if (require.main === module) {
  const names = process.argv.slice(2);
  const greetings = names.length > 0 ? greetAll(names) : [greet()];

  console.log(greetings.join("\n"));
}

module.exports = { greet, greetAll };
