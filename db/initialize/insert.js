import { categories } from "../data/categories.js";
import { components } from "../data/components.cjs";
import { pods } from "../data/pods.cjs";
import { pod_components } from "../data/pod_components.cjs";
import { pod_compatibility } from "../data/pod_compatibility.cjs";

const insertCategoriesSQL = `
INSERT INTO categories (name)
    VALUES 
    ${categories
      .map((category) => {
        return `('${category.name}')`;
      })
      .join(",")};

`;
const insertComponentsSQL = `

INSERT INTO components (code, category_id, status, link)
    VALUES
    ${components
      .map((component) => {
        return `('${component.code}', (SELECT id FROM categories WHERE name = '${component.category}'), '${component.status}', '${component.link}')`;
      })
      .join(",")};

`;

const insertPodsSQL = `
INSERT INTO pods (name)
    VALUES 
    ${pods
      .map((pod) => {
        return `('${pod.name}')`;
      })
      .join(",")};

`;

const insertPodComponentsSQL = `
INSERT INTO pod_components (pod_id, component_id, note, warning)
    VALUES 
    ${pod_components
      .map((item) => {
        return `( (SELECT id FROM pods WHERE name = '${item.podName}'),
        (SELECT id FROM components WHERE code = '${item.componentCode}'),
        '${item.note}',
        '${item.warning}' )`;
      })
      .join(",")};
`;

const insertPodCompatibilitySQL = `
INSERT INTO pod_compatibility (podA_id, podB_id)
    VALUES
    ${pod_compatibility
      .map((item) => {
        return `( (SELECT id FROM pods WHERE name = '${item.podNameA}'),
        (SELECT id FROM pods WHERE name = '${item.podNameB}') )`;
      })
      .join(",")};
`;

export {
  insertCategoriesSQL,
  insertComponentsSQL,
  insertPodsSQL,
  insertPodComponentsSQL,
  insertPodCompatibilitySQL,
};
