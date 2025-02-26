import { componentCode_compatList } from "../db/queries.js";
import { Request, Response } from "express";
import { HttpError } from "../errors/CustomErrors.js";

async function componentCompatList(req: Request, res: Response) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    const error = new HttpError("Missing / Invalid Required Parameter", 400);
    throw error;
  }

  // call database query
  const list = await componentCode_compatList(code.trim().toUpperCase());

  if (list.length === 0) {
    const error = new HttpError("Component Not Found", 404);
    throw error;
  }

  // send response
  res.json(list);
}

export { componentCompatList };
