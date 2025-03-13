import { pool } from "./pool.js";
import { HttpError } from "../errors/CustomErrors.js";

const qCACL_SQL = `

SELECT code
FROM components
ORDER BY code ASC;

`;

async function queryComponentsAllCodesList() {
  try {
    const { rows } = await pool.query(qCACL_SQL);
    return rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new HttpError("Database Query Failed", 500);
  }
}

const qCL_SQL = `

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
    pcs.id,
    cp.source_pod_id,
  	cp.pod_id,
	  sp.name AS source_pod_name,
    p.name AS pod_name, 
    c.code, 
    cat.name AS category,
    c.status, 
    c.link, 
    pcs.note,
    pcs.warning
FROM compatiblePods cp
JOIN pods sp ON cp.source_pod_id = sp.id
JOIN pod_components pcs ON cp.pod_id = pcs.pod_id
JOIN components c ON pcs.component_id = c.id
JOIN pods p ON pcs.pod_id = p.id
JOIN categories cat ON c.category_id = cat.id
ORDER BY cp.source_pod_id, cp.pod_id;

`;

async function queryCompatibilityList(componentCode: string) {
  try {
    const { rows } = await pool.query(qCL_SQL, [componentCode]);
    return rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new HttpError("Database Query Failed", 500);
  }
}

export { queryComponentsAllCodesList, queryCompatibilityList };
