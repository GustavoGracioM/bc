const pool = require('../db'); // caminho para o seu arquivo do pool
const fs = require('fs');
const path = require('path');

const service = {
  // ============================
  // CREATE POST
  // ============================
  async create({ legend, local, data, urls }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Cria o post
      const postResult = await client.query(
        `INSERT INTO posts (legend, local, data)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [legend, local, data]
      );

      const postId = postResult.rows[0].id;

      // 2. Cria cada imagem
      for (const url of urls) {
        const imgResult = await client.query(
          `INSERT INTO imgs (url)
           VALUES ($1)
           RETURNING id`,
          [url.original]
        );

        const imgId = imgResult.rows[0].id;

        // 3. Cria relação post <-> imagem
        await client.query(
          `INSERT INTO post_imgs (postId, imgId)
           VALUES ($1, $2)`,
          [postId, imgId]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // ============================
  // FIND ALL POSTS
  // ============================
  async findAll() {
    // Busca posts
    const postsResult = await pool.query(
      `SELECT * FROM posts
       ORDER BY data DESC, id DESC`
    );

    const posts = postsResult.rows;

    // Para cada post, buscar imagens
    for (const post of posts) {
      const imagesResult = await pool.query(
        `SELECT imgs.*
         FROM imgs
         INNER JOIN post_imgs ON imgs.id = post_imgs.imgId
         WHERE post_imgs.postId = $1
         ORDER BY imgs.id ASC`,
        [post.id]
      );

      post.images = imagesResult.rows;
    }

    return posts;
  },

  // ============================
  // FIND BY ID
  // ============================
  async findByPk(id) {
    const postResult = await pool.query(
      `SELECT * FROM posts WHERE id = $1`,
      [id]
    );

    if (postResult.rows.length === 0) return null;

    const post = postResult.rows[0];

    const imagesResult = await pool.query(
      `SELECT imgs.*
       FROM imgs
       INNER JOIN post_imgs ON imgs.id = post_imgs.imgId
       WHERE post_imgs.postId = $1
       ORDER BY imgs.id ASC`,
      [id]
    );

    post.images = imagesResult.rows;

    return post;
  },

  // ============================
  // DELETE POST
  // ============================
  async deleteById(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Buscar imagens do post
      const imagesResult = await client.query(
        `SELECT imgs.*
         FROM imgs
         INNER JOIN post_imgs ON imgs.id = post_imgs.imgId
         WHERE post_imgs.postId = $1`,
        [id]
      );

      const images = imagesResult.rows;

      // Remover arquivos locais (se existir)
      for (const image of images) {
        const filename = path.basename(image.url);
        const imagePath = path.join(__dirname, '../uploads', filename);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Remove relações
      await client.query(`DELETE FROM post_imgs WHERE postId = $1`, [id]);

      // Remove imagens (opcional — só remova se não forem usadas por outros posts)
      await client.query(
        `DELETE FROM imgs WHERE id IN (
          SELECT imgId FROM post_imgs WHERE postId = $1
        )`,
        [id]
      );

      // Remove o post
      await client.query(`DELETE FROM posts WHERE id = $1`, [id]);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = service;
