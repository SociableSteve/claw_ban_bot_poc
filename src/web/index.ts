import * as express from "express";

import site_router from "./site";
import api_router from "./api";

const app = express();
app.use("/", site_router);
app.use("/api", api_router);

app.listen(process.env.PORT || 8080);
