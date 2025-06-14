const pool = require('../config/db');

const createQuestion = async (questionData) => {
  const { user_id, lesson, topic, images, description } = questionData;

  try {
    // Veritabanına soruyu ekliyoruz
    const result = await pool.query(
      `INSERT INTO public.questions (user_id, lesson, topic, images, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, lesson, topic, images, description]
    );
    
    // Soru başarıyla eklenirse veritabanından dönen veriyi alıyoruz
    return result.rows[0];
  } catch (error) {
    console.error('Error creating question:', error);
    throw new Error('Error creating question');
  }
};


const getUserQuestions = async (userId, lesson, topic) => {
  let query = `SELECT * FROM public.questions WHERE user_id = $1`;
  let params = [userId];

  if (lesson) {
    query += ` AND lesson = $2`;
    params.push(lesson);
  }

  if (topic) {
    query += ` AND topic = $3`;
    params.push(topic);
  }

  const result = await pool.query(query, params);
  return result.rows;
};


const updateQuestion = async (questionId, updatedData) => {
  const { lesson, topic, description } = updatedData;
  const result = await pool.query(
    `UPDATE public.questions SET lesson = $1, topic = $2, description = $3 WHERE id = $4 RETURNING *`,
    [lesson, topic, description, questionId]
  );
  return result.rows[0];
};

const deleteQuestion = async (questionId) => {
  const result = await pool.query(
    `DELETE FROM public.questions WHERE id = $1 RETURNING *`,
    [questionId]
  );
  return result.rows[0];
};

module.exports = { createQuestion, getUserQuestions, updateQuestion, deleteQuestion };
