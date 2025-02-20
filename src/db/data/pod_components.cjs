const raw = require("./json/parsedRaw.json");

const pod_components = [];
raw.forEach((pod) => {
  pod.components.forEach((component) => {
    pod_components.push({
      podName: pod.name,
      componentCode: component.code,
      note: component.note,
      warning: component.warning,
    });
  });
});

module.exports = { pod_components };
