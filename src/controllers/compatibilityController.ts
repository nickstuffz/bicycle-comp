import { queryCompatibilityList } from "../db/queries.js";
import { Request, Response } from "express";
import { HttpError } from "../errors/CustomErrors.js";

async function compatibilityList(req: Request, res: Response) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    const error = new HttpError("Missing / Invalid Required Parameter", 400);
    throw error;
  }

  // call database query
  const rows = await queryCompatibilityList(code.trim().toUpperCase());

  if (rows.length === 0) {
    const error = new HttpError("Component Not Found", 404);
    throw error;
  }

  // send response
  res.json(rows);
}

export { compatibilityList };
