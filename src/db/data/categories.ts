import { catMap } from "./parsing/catMap.js";

type CatMap = typeof catMap;

type CategoryName = CatMap[keyof CatMap];

interface Category {
  name: CategoryName;
}

const seenCats = new Set();
const categories: Category[] = [];
Object.entries(catMap).forEach(([key, value]) => {
  if (seenCats.has(value)) {
    return;
  }
  seenCats.add(value);

  categories.push({ name: value });
});

export { categories };
