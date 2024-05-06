import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./database";
import { router as dogsRouter } from "./routes/dogs";
import { router as ownersRouter } from "./routes/owners";

const app = express();
app.use(cors({
    origin: "*"
}))

app.use("/dogs", dogsRouter);
app.use("/owners", ownersRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`[Server] Listening on port ${process.env.APP_PORT}`);
});
