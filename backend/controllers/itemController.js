import pool from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";


// GET ALL ITEMS
export const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get items error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// GET ITEM BY ID
export const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Get item error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// CREATE ITEM
export const createItem = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
  } = req.body;

  const imageFile = req.file;

  if (!name) {
    return res.status(400).json({
      error: "Item name is required",
    });
  }

  if (!price) {
    return res.status(400).json({
      error: "Price is required",
    });
  }

  if (!category) {
    return res.status(400).json({
      error: "Category is required",
    });
  }

  if (!imageFile) {
    return res.status(400).json({
      error: "Image is required",
    });
  }

  try {
    // Upload image to Cloudinary
    const uploadImage = await cloudinary.uploader.upload(
      imageFile.path,
      {
        resource_type: "image",
      }
    );

    const imageUrl = uploadImage.secure_url;

    // Insert item into database
    const result = await pool.query(
      `INSERT INTO items
       (name, description, price, category, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        description,
        price,
        category,
        imageUrl,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create item error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// UPDATE ITEM
export const updateItem = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    category,
    image,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE items
       SET name = $1,
           description = $2,
           price = $3,
           category = $4,
           image = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        description,
        price,
        category,
        image,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Update item error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// DELETE ITEM
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Delete item error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};