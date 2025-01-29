#! /usr/bin/env node

import dotenv from "dotenv";
import pg from "pg";
import { resetSQL } from "./SQL/reset.js";
import { createSQL } from "./SQL/create.js";
import { insertSQL } from "./SQL/insert.js";

dotenv.config();
const { Client } = pg;

const SQL = resetSQL + createSQL + insertSQL;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  console.log("connected");
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
