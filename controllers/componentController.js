import { componentCode_compatList } from "../db/queries.js";

async function componentCompatList(req, res) {
  const list = await componentCode_compatList(req.params.componentCode);
  if (list.length === 0) {
    const error = new Error("Component Not Found");
    error.status = 404;
    throw error;
  }
  res.json(list);
}

export { componentCompatList };
