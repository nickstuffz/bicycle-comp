import { pool } from "./pool.js";

const testSQL = `

WITH compatiblePods AS (
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
)
SELECT 
	c.code, cat.name AS category, p.name AS pod, c.status, c.link, pcs.note

FROM compatiblePods cp
JOIN pod_components pcs ON cp.pod_id = pcs.pod_id
JOIN components c ON pcs.component_id = c.id
JOIN pods p ON pcs.pod_id = p.id
JOIN categories cat ON p.category_id = cat.id

`;

async function testDB(testInput) {
  const { rows } = await pool.query(testSQL, [testInput]);
  console.log(rows);
  return;
}

testDB("RD-U6020-11");
