import podRelations from "./json/parsedRelations.json";

interface PodCompPair {
  podNameA: string;
  podNameB: string;
}

const pod_compatibility: PodCompPair[] = [];
podRelations.forEach((pod) => {
  pod_compatibility.push({ podNameA: pod[0], podNameB: pod[1] });
});
// A -> B entry
// pod A must always be to the left of pod B

export { pod_compatibility };
