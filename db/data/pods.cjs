const raw = require("./json/raw.json");

const pods = raw.map((pod) => ({
  name: pod.name,
  category: pod.category,
}));

module.exports = { pods };
