import express from "express";
import { componentRouter } from "./routes/componentRouter.js";

// initialization
const app = express();

// routes
app.get("/", (req, res) => {
  res.send(
    "Hello! Welcome to the bicycle component compatibility API. This is a WIP. This app is currently based on Shimano's 2024-2025 v30 compatibilty information data. In order to use, query a URL as such: /api/component?code=ST-9000",
  );
});
app.use("/api/component", componentRouter);

// error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

// start server
const port = process.env.PORT || 8080;
// syntax for binding to both IPv4 and IPv6
app.listen(port, "::", () => {
  console.log(`Server listening on [::]${port}`);
});
