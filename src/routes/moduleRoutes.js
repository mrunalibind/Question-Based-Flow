import express from "express";
const moduleRouter = express.Router();

import { startModule } from "../controllers/moduleController.js";

moduleRouter.post("/:moduleId/start", startModule);

export default moduleRouter;