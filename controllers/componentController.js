import { componentCode_compatList } from "../db/queries.js";

async function componentCompatList(req, res) {
  const list = await componentCode_compatList(req.params.componentCode);
  res.json(list);
}

export { componentCompatList };
