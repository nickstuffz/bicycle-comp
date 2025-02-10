const raw = require("./json/parsedRaw.json");

const pods = [];
raw.forEach((pod) => {
  pods.push({
    name: pod.name,
  });
});

module.exports = { pods };
