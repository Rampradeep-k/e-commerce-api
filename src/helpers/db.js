// db.js
import pool from '../helpers/db-connector.js';

export const executeQuery = async (query, values) => {
  const result = await pool.query(query, values);
  return result.rows;
};