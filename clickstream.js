const fs = require("fs");
const readline = require("readline");
const { run } = require("./producer.js");


const fileStream = fs.createReadStream("data.json");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  run(line);
});

rl.on("close", () => {
  console.log("Finished reading the file.");
});
