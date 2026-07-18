import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

dotenv.config();

const { Pool } = pg;
const port = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json());

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize database table on startup
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database table 'notes' is ready.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
initDB();

// API Endpoints for Notes App

// 1. Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// 2. Create a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const result = await pool.query(
      "INSERT INTO notes (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

// 3. Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})