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
    if (line.startsWith("###")) {
      currentBlocks = line.replace("### Blocks ", "");
      return;
    }
    const numberMatch = line.match(/^(\d+),(\d+)$/);
    if (numberMatch) {
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
  console.dir(output);
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
