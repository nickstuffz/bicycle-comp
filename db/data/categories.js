import { catMap } from "./raw/catMap.js";

const seenCats = new Set();
const categories = [];

Object.keys(catMap).forEach((key) => {
  if (seenCats.has(catMap[key])) {
    return;
  }
  seenCats.add(catMap[key]);

  categories.push({ name: catMap[key] });
});

export { categories };
