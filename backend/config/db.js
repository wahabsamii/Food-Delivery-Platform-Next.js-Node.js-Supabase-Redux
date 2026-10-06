import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.log("Database connection error:", err.message);
  }

  console.log("Postgres Connected!");
  release();
});

export default pool;

