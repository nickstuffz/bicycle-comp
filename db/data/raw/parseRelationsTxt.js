import fs from "fs";

function parseRelations(text) {
  const lines = text
    // split into string lines
    .split("\n")
    // remove leading/trailing whitespace
    .map((line) => line.trim())
    // remove empty lines
    .filter((line) => line);

  const output = [];
  let currentBlocks = null;

  lines.forEach((line) => {
    const blockMatch = line.match(/^### Blocks (\d+)$/);
    if (blockMatch) {
      // Set Block Group
      currentBlocks = blockMatch[1];
      return;
    }
    const numberMatch = line.match(/^(\d+),(\d+)$/);
    if (numberMatch) {
      // Add Relation
      const firstNumber = numberMatch[1];
      const secondNumber = numberMatch[2];
      output.push([
        `${currentBlocks}.${firstNumber}`,
        `${currentBlocks}.${secondNumber}`,
      ]);
    } else {
      console.error("Error: Unhandled Line: " + line);
    }
  });
  return output;
}

const inputText = fs.readFileSync("db/data/raw/relations.txt", "utf8");
console.log("parsing relations...");
const jsonOutput = parseRelations(inputText);
console.log("writing relations...");
fs.writeFileSync(
  "db/data/json/parsedRelations.json",
  JSON.stringify(jsonOutput, null, 2),
);
console.log("done");
