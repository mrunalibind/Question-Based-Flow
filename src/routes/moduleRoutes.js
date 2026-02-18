import express from "express";
const moduleRouter = express.Router();

import { startModule } from "../controllers/moduleController.js";
console.log("Working on module routes...");
moduleRouter.post("/:moduleId/start", startModule);

export default moduleRouter;