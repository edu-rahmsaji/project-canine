import "dotenv/config";
import express from "express";
import cors from "cors";

import "./database";
import { router as dogsRouter } from "./routes/dogs";
import { router as ownersRouter } from "./routes/owners";
import { router as schoolsRouter } from "./routes/schools";
import { router as instructorsRouter } from "./routes/instructors";
import { router as sessionsRouter } from "./routes/sessions";
import { router as aggregationsRouter } from "./routes/aggregations";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.use("/dogs", dogsRouter);
app.use("/owners", ownersRouter);
app.use("/schools", schoolsRouter);
app.use("/instructors", instructorsRouter);
app.use("/sessions", sessionsRouter);
app.use("/aggregations", aggregationsRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`[Server] Listening on port ${process.env.APP_PORT}`);
});
