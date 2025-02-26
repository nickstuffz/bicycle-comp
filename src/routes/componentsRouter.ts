import { Router } from "express";
import asyncHandler from "express-async-handler";
import { componentsAllCodesList } from "../controllers/componentsController.js";

const componentsRouter = Router();

componentsRouter.get("/codes", asyncHandler(componentsAllCodesList));

export { componentsRouter };
