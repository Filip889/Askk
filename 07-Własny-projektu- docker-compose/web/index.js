const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "notesdb"
});

const redis = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
redis.connect();

pool.query(`
  CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
  );
`);

app.get("/api/notes", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/api/notes", async (req, res) => {
  await pool.query("INSERT INTO notes (content) VALUES ($1)", [req.body.content]);
  res.sendStatus(201);
});

app.get("/api/views", async (req, res) => {
  const views = await redis.incr("views");
  res.json({ views });
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3000, () => console.log("Notes app running on port 3000"));
