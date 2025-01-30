import { categories } from "../data/categories.js";
import { components } from "../data/components.cjs";

export const insertSQL = `

INSERT INTO categories (name)
    VALUES 
    ${categories
      .map((category) => {
        return `('${category.name}')`;
      })
      .join(",")};

INSERT INTO components (code, link)
    VALUES
    ${components
      .map((component) => {
        return `('${component.code}', '${component.link}')`;
      })
      .join(",")};

`;
