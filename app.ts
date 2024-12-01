import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);
export default app;
