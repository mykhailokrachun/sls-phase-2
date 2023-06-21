import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.SUPABASE_HOST_LINK,
  user: 'postgres',
  password: process.env.SUPABASE_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: 'postgres',
});

export default pool;
