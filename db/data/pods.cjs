const raw = require("./raw.json");

const pods = raw.map((pod) => ({
  name: pod.name,
  category: pod.category,
}));

module.exports = { pods };
