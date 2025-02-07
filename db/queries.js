import { pool } from "./pool.js";

const testSQL = `

WITH RECURSIVE compatiblePodsLeft AS (
    SELECT pcs.pod_id AS pod_id, pcs.pod_id AS source_pod_id
    FROM pod_components pcs
    JOIN components c ON pcs.component_id = c.id
    WHERE c.code = ($1)
    
    UNION
    
    SELECT pcy.podA_id AS pod_id, compatiblePodsLeft.source_pod_id AS source_pod_id
    FROM pod_compatibility pcy
    JOIN compatiblePodsLeft ON pcy.podB_id = compatiblePodsLeft.pod_id
),
compatiblePodsRight AS (
    SELECT pcs.pod_id AS pod_id, pcs.pod_id AS source_pod_id
    FROM pod_components pcs
    JOIN components c ON pcs.component_id = c.id
    WHERE c.code = ($1)
    
    UNION 
    
    SELECT pcy.podB_id AS pod_id, compatiblePodsRight.source_pod_id AS source_pod_id
    FROM pod_compatibility pcy
    JOIN compatiblePodsRight ON pcy.podA_id = compatiblePodsRight.pod_id
),
compatiblePods AS (
    SELECT * FROM compatiblePodsLeft
    UNION
    SELECT * FROM compatiblePodsRight
)
SELECT 
    cp.source_pod_id,
	cp.pod_id,
	sp.name AS source_pod_name,
    p.name AS pod_name, 
    cat.name AS category,
    c.code, 
    c.status, 
    c.link, 
    pcs.note
FROM compatiblePods cp
JOIN pods sp ON cp.source_pod_id = sp.id
JOIN pod_components pcs ON cp.pod_id = pcs.pod_id
JOIN components c ON pcs.component_id = c.id
JOIN pods p ON pcs.pod_id = p.id
JOIN categories cat ON p.category_id = cat.id
ORDER BY cp.source_pod_id, cp.pod_id;

`;

async function componentCode_compatList(componentCode) {
  try {
    const { rows } = await pool.query(testSQL, [componentCode]);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database Query Failed");
  }
}

export { componentCode_compatList };
