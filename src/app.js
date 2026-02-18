import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import moduleRouter from "./routes/moduleRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use("/modules", moduleRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to Wysa API"});
});

export default app;