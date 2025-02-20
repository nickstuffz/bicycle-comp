import fs from "fs";

type OutputString = `${number}.${number}`;
type NumericalString = `${number}`;

function parseRelations(text: string) {
  const lines = text
    // split into string lines
    .split("\n")
    // remove leading/trailing whitespace
    .map((line) => line.trim())
    // remove empty lines
    .filter((line) => line);
  const output: [OutputString, OutputString][] = [];
  let currentBlocks: NumericalString;

  lines.forEach((line) => {
    const blockMatch = line.match(/^### Blocks (\d+)$/);
    if (blockMatch) {
      // Set Block Group
      currentBlocks = blockMatch[1] as NumericalString;
      return;
    }
    const numberMatch = line.match(/^(\d+),(\d+)$/);
    if (numberMatch) {
      // Add Relation
      const firstNumber = numberMatch[1] as NumericalString;
      const secondNumber = numberMatch[2] as NumericalString;
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

const inputText = fs.readFileSync("raw/relations.txt", "utf8");
console.log("parsing relations...");
const jsonOutput = parseRelations(inputText);
console.log("writing relations...");
fs.writeFileSync(
  "src/db/data/json/parsedRelations.json",
  JSON.stringify(jsonOutput, null, 2),
);
console.log("done");
