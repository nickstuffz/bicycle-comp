const podRelations = require("./json/podRelations.json");

// A -> B entry
// pod A must always be to the left of pod B
const pod_compatibility = [];
podRelations.forEach((pod) => {
  pod_compatibility.push({ podNameA: pod[0], podNameB: pod[1] });
});

module.exports = { pod_compatibility };
