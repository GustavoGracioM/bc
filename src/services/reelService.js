const pool = require('../db'); // ajuste o caminho se necessário

const service = {

  // =======================
  // CREATE
  // =======================
  async create({ description, data, url, local }) {
    const result = await pool.query(
      `INSERT INTO reels (description, data, url, local)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [description, data, url, local]
    );

    return result.rows[0];
  },

  // =======================
  // FIND ALL
  // =======================
  async findAll() {
    const result = await pool.query(
      `SELECT *
       FROM reels
       ORDER BY data ASC`
    );

    return result.rows;
  },

  // =======================
  // FIND BY ID
  // =======================
  async findByPk(id) {
    const result = await pool.query(
      `SELECT *
       FROM reels
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  },

  // =======================
  // DELETE BY ID
  // =======================
  async deleteById(id) {
    const check = await pool.query(
      `SELECT id FROM reels WHERE id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      throw new Error('Reels não encontrado');
    }

    await pool.query(
      `DELETE FROM reels WHERE id = $1`,
      [id]
    );
  },
};

module.exports = service;
