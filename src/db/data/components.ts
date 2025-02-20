import raw from "./json/parsedRaw.json";

type Status = "new" | "discont" | "current";

interface Component {
  code: string;
  category: string;
  status: Status;
  link: string;
}

const seenCodes = new Set();
const components: Component[] = [];
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
      status: component.status as Status,
      link: link,
    });
  });
});

export { components };
