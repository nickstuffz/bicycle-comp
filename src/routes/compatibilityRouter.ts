import { Router } from "express";
import asyncHandler from "express-async-handler";
import { compatibilityList } from "../controllers/compatibilityController.js";

const compatibilityRouter = Router();

compatibilityRouter.get("/", asyncHandler(compatibilityList));

export { compatibilityRouter };
