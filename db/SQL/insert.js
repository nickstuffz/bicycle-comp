import categories from "../data/categories.json";
import { components } from "../data/components.js";

export const insertSQL = `

INSERT INTO categories (name)
    VALUES 
    ${categories
      .map((category) => {
        return `('${category.name}')`;
      })
      .join(",")}

INSERT INTO components (code, category_id, link)
    VALUES
    ${components
      .map((component) => {
        return `('${component.code}', ${component.category_id}, '${component.link}')`;
      })
      .join(",")}

`;
