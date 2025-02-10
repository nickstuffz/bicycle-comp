#! /usr/bin/env node

import dotenv from "dotenv";
import pg from "pg";
import { resetSQL } from "./initialize/reset.js";
import { createSQL } from "./initialize/create.js";
import {
  insertCategoriesSQL,
  insertComponentsSQL,
  insertPodsSQL,
  insertPodComponentsSQL,
  insertPodCompatibilitySQL,
} from "./initialize/insert.js";

dotenv.config();
const { Client } = pg;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
    // connectionString: process.env.RAILWAY_URL,
  });
  await client.connect();
  console.log("connected");
  await client.query(resetSQL);
  console.log("dropped tables");
  await client.query(createSQL);
  console.log("created tables");
  await client.query(insertCategoriesSQL);
  console.log("inserted categories");
  await client.query(insertComponentsSQL);
  console.log("inserted components");
  await client.query(insertPodsSQL);
  console.log("inserted pods");
  await client.query(insertPodComponentsSQL);
  console.log("inserted pod components");
  await client.query(insertPodCompatibilitySQL);
  console.log("inserted pod compatibility");
  await client.end();
  console.log("done");
}

main();
