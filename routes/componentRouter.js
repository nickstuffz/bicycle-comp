import { Router } from "express";
import { componentCompatList } from "../controllers/componentController.js";

const componentRouter = Router();

componentRouter.get("/:componentCode", componentCompatList);

export { componentRouter };
