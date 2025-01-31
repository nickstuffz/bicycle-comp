const raw = require("./json/raw.json");

const seenCodes = new Set();
const components = [];
raw.forEach((pod) => {
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

console.log(components);

module.exports = { components };
