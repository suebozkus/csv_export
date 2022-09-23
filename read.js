const fs = require("fs");

const text = fs.readFileSync("./result.csv", "utf-8");
console.log(text);
const parsedText = text.split("\n");
console.log(parsedText);
parsedText.map((line) => {
  console.log(line.split(","));
});
