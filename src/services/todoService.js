const pool = require('../db'); // ajuste o caminho se necessário

const service = {

  // =====================================
  // PEGAR A PRÓXIMA POSIÇÃO
  // =====================================
  async getNextPosition() {
    const result = await pool.query(`SELECT MAX(position) AS max FROM todo`);
    const max = result.rows[0].max;
    return (max || 0) + 1;
  },

  // =====================================
  // CREATE
  // =====================================
  async create({ description, data }) {
    const position = await this.getNextPosition();

    const result = await pool.query(
      `INSERT INTO todo (description, data, done, position)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [description, data, false, position]
    );

    return result.rows[0];
  },

  // =====================================
  // FIND ALL
  // =====================================
  async findAll() {
    const result = await pool.query(
      `SELECT *
       FROM todo
       ORDER BY position ASC`
    );

    return result.rows;
  },

  // =====================================
  // FIND BY ID
  // =====================================
  async findByPk(id) {
    const result = await pool.query(
      `SELECT *
       FROM todo
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  },

  // =====================================
  // DELETE
  // =====================================
  async deleteById(id) {
    const done = await pool.query(
      `SELECT id FROM todo WHERE id = $1`,
      [id]
    );

    if (done.rows.length === 0) {
      throw new Error('ToDo não encontrado');
    }

    await pool.query(
      `DELETE FROM todo WHERE id = $1`,
      [id]
    );
  },

  // =====================================
  // UPDATE
  // =====================================
  async updateById(id, { description, data, done, position }) {
    const exists = await pool.query(
      `SELECT * FROM todo WHERE id = $1`,
      [id]
    );

    if (exists.rows.length === 0) {
      throw new Error('ToDo não encontrado');
    }

    // Atualiza apenas os campos enviados
    const updated = await pool.query(
      `UPDATE todo SET
          description = COALESCE($2, description),
          data = COALESCE($3, data),
          done = COALESCE($4, done),
          position = COALESCE($5, position)
       WHERE id = $1
       RETURNING *`,
      [
        id,
        description ?? null,
        data ?? null,
        done ?? null,
        position ?? null,
      ]
    );

    return updated.rows[0];
  },
};

module.exports = service;
