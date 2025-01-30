import { categories } from "../data/categories.js";
import { components } from "../data/components.cjs";
import { pods } from "../data/pods.cjs";

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


INSERT INTO pods (name, category_id)
    VALUES 
    ${pods
      .map((pod) => {
        return `('${pod.name}', (SELECT id FROM categories WHERE name = '${pod.category}'))`;
      })
      .join(",")};      

`;
