import raw from "./json/parsedRaw.json";

interface PodComponent {
  podName: string;
  componentCode: string;
  note: string;
  warning: string;
}

const pod_components: PodComponent[] = [];
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

export { pod_components };
