const raw = require("./json/parsedRaw.json");

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
        : "";

    components.push({
      code: component.code,
      category: component.category,
      status: component.status,
      link: link,
    });
  });
});

module.exports = { components };
