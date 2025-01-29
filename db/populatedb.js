#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `

-- Statement # 1
DROP TABLE IF EXISTS categories, components, compatibility;

-- Statement # 2
CREATE TABLE categories (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Statement # 3
CREATE TABLE components (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    category_id INT NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
    link VARCHAR(2048),
    notes TEXT
);

-- Statement # 4
CREATE TABLE compatibility (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    component_id INT NOT NULL REFERENCES components (id) ON DELETE CASCADE,
    compatible_id INT NOT NULL REFERENCES components (id) ON DELETE CASCADE,
    UNIQUE (component_id, compatible_id)
);

`;

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
