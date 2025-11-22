const { Pool } = require("pg");
const { DATABASE_URL } = require("./env");

// Railway/Render Postgres SSL 설정 필요
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// DB 연결 테스트용 (debug)
pool.connect()
  .then(() => console.log("📦 PostgreSQL Connected"))
  .catch(err => console.error("❌ PostgreSQL Connect Error:", err));

module.exports = pool;
