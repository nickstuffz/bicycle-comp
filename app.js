import express from "express";
import { componentRouter } from "./routes/componentRouter.js";
import path from "path";
import { fileURLToPath } from "url";

// initialization
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
