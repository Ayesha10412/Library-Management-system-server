import express, { Application, Request, Response } from "express";
import { routes } from "./app/controller/book.controller";
import { route } from "./app/controller/borrow.controller";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/routes/api/books", routes);
app.use("/route/api/borrow", route);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library management.");
});
export default app;
