import express from "express";
import asyncHandler from "express-async-handler";

import { componentRouter } from "./routes/componentRouter.js";

const app = express();

app.use("/api/component", componentRouter);

// Start Server
const port = process.env.PORT || 8080;
// syntax for binding to both IPv4 and IPv6
app.listen(port, "::", () => {
  console.log(`Server listening on [::]${port}`);
});
