import express from "express";
import { Request, Response, NextFunction } from "express";
import { componentsRouter } from "./routes/componentsRouter.js";
import { compatibilityRouter } from "./routes/compatibilityRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { HttpError } from "./errors/CustomErrors.js";
import cors from "cors";

// TODO: change to actual frontend URL, setup HTTPS
const frontendUrl = "http://localhost:5173";

const corsOptions = {
  origin: frontendUrl,
  methods: ["GET"],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialization
const app = express();
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/api/components", componentsRouter);

app.use("/api/compatibility", compatibilityRouter);

// error handling
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

// start server
const port = Number(process.env.PORT) || 8080;
// syntax for binding to both IPv4 and IPv6
app.listen(port, "::", () => {
  console.log(`Server listening on [::]${port}`);
});
