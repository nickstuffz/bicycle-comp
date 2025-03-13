import { queryCompatibilityList } from "../db/queries.js";
import { Request, Response } from "express";
import { HttpError } from "../errors/CustomErrors.js";

async function compatibilityList(req: Request, res: Response) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    throw new HttpError("Missing / Invalid Required Parameter", 400);
  }

  // call database query
  const rows = await queryCompatibilityList(code);

  if (rows.length === 0) {
    throw new HttpError("Component Not Found", 404);
  }

  // send response
  res.json(rows);
}

export { compatibilityList };
