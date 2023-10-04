import "dotenv/config";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import recordRouter from "./routes/contentRegister.router";

const app: Express = express();
const PORT = process.env.PORT || 3001;

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(recordRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Magi-Koa Api  " });
});

app.listen(PORT, () => {
  console.log("Initialized Server!!!");
});
