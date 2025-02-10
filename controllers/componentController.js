import { componentCode_compatList } from "../db/queries.js";

async function componentCompatList(req, res) {
  const { code } = req.query;
  const list = await componentCode_compatList(code);
  if (list.length === 0) {
    const error = new Error("Component Not Found");
    error.status = 404;
    throw error;
  }
  res.json(list);
}

export { componentCompatList };
