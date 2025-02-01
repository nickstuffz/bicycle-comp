const raw = require("./json/raw.json");

const seenCodes = new Set();
const components = [];
raw.forEach((pod) => {
  pod.components.forEach((component) => {
    if (seenCodes.has(component.code)) {
      return;
    }
    seenCodes.add(component.code);

    const link =
      component.status !== "discont"
        ? `https://productinfo.shimano.com/product/${component.code}`
        : null;

    components.push({
      code: component.code,
      status: component.status,
      link: link,
    });
  });
});

module.exports = { components };
