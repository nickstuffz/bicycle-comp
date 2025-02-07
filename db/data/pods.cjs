const raw = require("./json/parsedRaw.json");

const pods = [];
raw.forEach((pod) => {
  pods.push({
    name: pod.name,
    category: pod.category,
  });
});

module.exports = { pods };
