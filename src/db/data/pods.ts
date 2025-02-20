import raw from "./json/parsedRaw.json";

interface Pod {
  name: string;
}

const pods: Pod[] = [];
raw.forEach((pod) => {
  pods.push({
    name: pod.name,
  });
});

export { pods };
