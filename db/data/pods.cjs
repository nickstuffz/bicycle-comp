const podsRaw = require("./pods.json");

const pods = podsRaw.map((pod) => ({
  name: pod.name,
  category: pod.category,
}));

module.exports = { pods };
