import { categories } from "../data/categories.js";
import { components } from "../data/components.cjs";
import { pods } from "../data/pods.cjs";
import { pod_components } from "../data/pod_components.cjs";

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

INSERT INTO pod_components (pod_id, component_id, note)
    VALUES 
    ${pod_components
      .map((item) => {
        return `( (SELECT id FROM pods WHERE name = '${item.podName}'),
        (SELECT id FROM components WHERE code = '${item.componentCode}'),
        '${item.note}')`;
      })
      .join(",")};      

`;
