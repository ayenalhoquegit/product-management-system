import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import appRouter from "./routes/app.routes";
import { Constants } from "./utils/constants.utils";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(`/${Constants.API}/${Constants.API_VERSION_1}`, appRouter);

app.listen(3000, () => {
  console.log("Listening port 3000");
});
