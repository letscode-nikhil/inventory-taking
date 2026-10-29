
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
  res.json({ message: 'Inventory backend is running' });
});

app.get('/api/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS database_time');
    res.json({
      connected: true,
      database_time: result.rows[0].database_time
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ connected: false });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
