import { pool } from "./pool.js";

const testSQL = `

WITH RECURSIVE compatiblePodsA AS (

SELECT pcs.pod_id
FROM pod_components pcs
JOIN components c ON pcs.component_id = c.id
WHERE c.code = ($1)

UNION

SELECT pcy.podA_id
FROM pod_compatibility pcy
JOIN compatiblePodsA ON pcy.podB_id = compatiblePodsA.pod_id

),

compatiblePodsB AS (

SELECT pcs.pod_id
FROM pod_components pcs
JOIN components c ON pcs.component_id = c.id
WHERE c.code = ($1)

UNION 

SELECT pcy.podB_id
FROM pod_compatibility pcy
JOIN compatiblePodsB ON pcy.podA_id = compatiblePodsB.pod_id

)

SELECT pod_id FROM compatiblePodsA
UNION
SELECT pod_id FROM compatiblePodsB


`;

async function testDB(testInput) {
  const { rows } = await pool.query(testSQL, [testInput]);
  console.log(rows);
  return;
}

testDB("RD-U8000");

// use asynchandler

// component code
// get ID of pods component belongs to

// use pods ID to find compatible pod IDs

// get all components in compatible pods
