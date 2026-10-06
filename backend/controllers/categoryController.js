import pool from "../config/db.js";


// GET ALL CATEGORIES
export const getAllCategory = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM category ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get categories error:", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM category WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Get category error:", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// CREATE CATEGORY
export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO category(name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create category error:", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }

  try {
    const result = await pool.query(
      "UPDATE category SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Update category error:", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM category WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category: result.rows[0],
    });
  } catch (error) {
    console.error("Delete category error:", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};