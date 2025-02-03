import { Router } from "express";
import asyncHandler from "express-async-handler";
import { componentCompatList } from "../controllers/componentController.js";

const componentRouter = Router();

componentRouter.get("/:componentCode", asyncHandler(componentCompatList));

export { componentRouter };
