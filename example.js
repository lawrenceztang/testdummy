function greet(name = "World") {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new TypeError("Name must not be empty");
  }

  return `Hello, ${trimmedName}!`;
}

if (require.main === module) {
  console.log(greet(process.argv[2]));
}

module.exports = { greet };
