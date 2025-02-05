const raw = require("./json/raw.json");

const pods = [];
raw.forEach((pod) => {
  pods.push({
    name: pod.name,
    category: pod.category,
  });
});

module.exports = { pods };
