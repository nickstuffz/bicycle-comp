import { componentCode_compatList } from "../db/queries.js";

async function componentCompatList(req, res) {
  const { code } = req.query;
  if (!code) {
    const error = new Error("Missing Required Parameter");
    error.status = 400;
    throw error;
  }

  const list = await componentCode_compatList(code.trim().toUpperCase());
  if (list.length === 0) {
    const error = new Error("Component Not Found");
    error.status = 404;
    throw error;
  }
  res.json(list);
}

export { componentCompatList };
