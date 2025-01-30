const pods = require("./pods.json");

const seenCodes = new Set();
const components = [];
pods.forEach((pod) => {
  pod.components.forEach((component) => {
    if (seenCodes.has(component.code)) {
      return;
    }
    seenCodes.add(component.code);

    const link = component.link
      ? `https://productinfo.shimano.com/product/${component.code}`
      : null;

    components.push({ code: component.code, link: link });
  });
});

module.exports = { components };
