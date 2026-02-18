import express from "express";
import { getQuestionByDeepLink, goBack, submitAnswer } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/:userId/answer", submitAnswer);
userRouter.get("/:userId/questions/:questionId", getQuestionByDeepLink);
userRouter.post("/:userId/back", goBack);

export default userRouter;