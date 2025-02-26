import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
});
