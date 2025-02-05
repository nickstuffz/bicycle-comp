const raw = require("./json/raw.json");

const pod_components = [];
raw.forEach((pod) => {
  pod.components.forEach((component) => {
    pod_components.push({
      podName: pod.name,
      componentCode: component.code,
      note: component.note,
    });
  });
});

module.exports = { pod_components };
