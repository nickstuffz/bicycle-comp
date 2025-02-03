import express from "express";
import { componentRouter } from "./routes/componentRouter.js";

// initialization
const app = express();

// routes
app.use("/api/component", componentRouter);

// error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Servor Error" });
});

// start server
const port = process.env.PORT || 8080;
// syntax for binding to both IPv4 and IPv6
app.listen(port, "::", () => {
  console.log(`Server listening on [::]${port}`);
});
