import fs from "fs";
import { catMap } from "./catMap.js";

type Status = "new" | "discont" | "current";

type CatCode = keyof typeof catMap;

interface Block {
  name: string;
  components: Component[];
}

interface Component {
  code: string;
  category: string;
  status: Status;
  note: string;
  warning: string;
  noteStop?: boolean;
}

function parseRaw(text: string) {
  const lines = text
    // aggregate and format note lines
    .replace(/\(\s*([^)]+)\s*\)/g, (match, p1) => {
      return `%${p1
        .replace(/\s*≤\s*/g, " ≤ ")
        .replace(/\s*\/\s*/g, " / ")
        .replace(/\s+/g, " ")}`;
    })
    // split into string lines
    .split("\n")
    // remove leading/trailing whitespace
    .map((line) => line.trim())
    // remove empty lines
    .filter((line) => line);
  const output: Block[] = [];
  let block: Block = { name: "", components: [] };

  lines.forEach((line) => {
    // Check if Block Header Line
    const blockMatch = line.match(/^### Block (\d+\.\d+)$/);
    if (blockMatch) {
      // Push Old Block
      if (block.name !== "") {
        output.push(block);
      }
      // New Block / Set Name
      block = { name: blockMatch[1], components: [] };
      return;
    }
    // Check if Component Code Line
    const codeMatch = line.match(/^([A-Z]{2,4})-/);
    if (codeMatch) {
      // Determine Category
      let catCode: CatCode | undefined;
      const rawCode: string = codeMatch[1];
      if (rawCode === "SM") {
        const smMatch = line.match(/^SM-([A-Z]{2})/);
        if (smMatch && smMatch[1] in catMap) {
          catCode = smMatch[1] as CatCode;
        } else {
          console.error("Error: SM category match failed");
        }
      }
      if (rawCode in catMap) {
        catCode = rawCode as CatCode;
      }
      // Unhandled Category Error Check
      if (catCode === undefined) {
        console.error("Error: Unhandled Category: " + catCode);
        return;
      }
      const compCat = catMap[catCode];
      // Determine Status
      let status: Status;
      if (line.endsWith("**")) {
        status = "new";
      } else if (line.endsWith("*")) {
        status = "discont";
      } else {
        status = "current";
      }
      // Add Component to Block / Set Code, Category, Status
      block.components.push({
        code: line.replace(/\*+$/, ""),
        category: compCat,
        status: status,
        note: "",
        warning: "",
      });
      return;
    }
    // Check if Warning Line
    if (line.startsWith("#", 0)) {
      // Set Warning On Latest Component
      block.components[block.components.length - 1].warning =
        line.charAt(1).toUpperCase() + line.slice(2);
      return;
    }
    // Check if Note Stop Line
    if (line.startsWith("---", 0)) {
      // Set noteStop On Latest Component
      block.components[block.components.length - 1].noteStop = true;
      return;
    }
    // Check if Note Line
    if (line.startsWith("%")) {
      // Set Notes to Above Components (until another note, or noteStop is found)
      let n = block.components.length - 1;
      while (
        n >= 0 &&
        block.components[n] &&
        block.components[n].note === "" &&
        !block.components[n].noteStop
      ) {
        block.components[n].note = line.charAt(1).toUpperCase() + line.slice(2);
        n--;
      }
      return;
    } else {
      console.error("Error: Unhandled Line: " + line);
    }
  });
  // Push Last Block
  if (block.name !== "") {
    output.push(block);
  }
  return output;
}

const inputText = fs.readFileSync("raw/raw.txt", "utf8");
console.log("parsing raw...");
const jsonOutput = parseRaw(inputText);
console.log("writing raw...");
fs.writeFileSync(
  "src/db/data/json/parsedRaw.json",
  JSON.stringify(jsonOutput, null, 2),
);
console.log("done");
