import { queryComponentsAllCodesList } from "../db/queries.js";
import { Request, Response } from "express";
import { HttpError } from "../errors/CustomErrors.js";

async function componentsAllCodesList(req: Request, res: Response) {
  //call database query
  const rows = await queryComponentsAllCodesList();

  if (rows.length === 0) {
    throw new HttpError("No Data Found", 404);
  }

  res.json(rows);
}

export { componentsAllCodesList };
