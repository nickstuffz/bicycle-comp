import fs from "fs";

function parseBlocks(rawText) {
  const catMap = {
    BB: "bottom braket",
    BR: "brake",
    BL: "brake lever",
    CS: "cassette",
    CH: "chain",
    CR: "crankset",
    FD: "front derailleur",
    RD: "rear derailleur",
    SH: "shifter",
    SL: "shifter lever",
  };
  const lines = rawText
    // aggregate and format note lines
    .replace(/\(\s*([^)]+)\s*\)/g, (match, p1) => {
      return `(${p1.replace(/\s*≤\s*/g, " ≤ ").replace(/\s+/g, " ")})`;
    })
    // split into string lines
    .split("\n")
    // remove leading/trailing whitespace
    .map((line) => line.trim())
    // remove empty lines
    .filter((line) => line);

  const output = [];
  let block = null;

  lines.forEach((line) => {
    if (line.startsWith("###")) {
      // Push Old Block
      if (block) {
        output.push(block);
      }
      // New Block / Set Name
      block = { name: line.replace("### Block ", ""), components: [] };
      return;
    }
    const codeMatch = line.match(/^([A-Z]{2,4})-/);
    if (codeMatch) {
      if (block.components.length === 0) {
        block.category = catMap[codeMatch[1]];
      }

      let status = "";
      // Set Status
      if (line.endsWith("**")) {
        status = "new";
      } else if (line.endsWith("*")) {
        status = "discont";
      } else {
        status = "current";
      }
      // Add Component to Block / Set Code
      block.components.push({
        code: line.replace(/\*+$/, ""),
        status: status,
        note: "",
        warning: "",
      });
      return;
    }
    if (line.startsWith("#", 0)) {
      // Set Warning On Latest Component
      block.components[block.components.length - 1].warning = line;
      return;
    }
    if (line.startsWith("---")) {
      // Set noteStop On Latest Component
      block.components[block.components.length - 1].noteStop = true;
      return;
    }
    if (line.startsWith("(") && line.endsWith(")")) {
      // Set Notes to Above Components (until another note, or noteStop is found)
      let n = block.components.length - 1;
      while (
        n >= 0 &&
        block.components[n] &&
        block.components[n].note === "" &&
        !block.components[n].noteStop
      ) {
        block.components[n].note = line;
        n--;
      }
      return;
    } else {
      console.error("Error: Unhandled Line: " + line);
    }
  });
  console.dir(output, { depth: null });
  return output;
}

const inputText = fs.readFileSync("db/data/raw/raw.txt", "utf8");

const jsonOutput = parseBlocks(inputText);

fs.writeFileSync(
  "db/data/json/parsedRaw.json",
  JSON.stringify(jsonOutput, null, 2),
);
