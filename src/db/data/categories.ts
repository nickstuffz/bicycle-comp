import { catMap } from "./parsing/catMap.js";

const seenCats = new Set();
const categories = [];

Object.entries(catMap).forEach(([key, value]) => {
  if (seenCats.has(value)) {
    return;
  }
  seenCats.add(value);

  categories.push({ name: value });
});

export { categories };
