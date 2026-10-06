import express from "express";

import {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();


// GET ALL CATEGORIES
router.get("/", getAllCategory);


// GET CATEGORY BY ID
router.get("/:id", getCategoryById);


// CREATE CATEGORY - ADMIN ONLY
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createCategory
);


// UPDATE CATEGORY - ADMIN ONLY
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateCategory
);


// DELETE CATEGORY - ADMIN ONLY
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteCategory
);


export default router;