import express from "express";

import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.js";

import upload from "../middleware/multer.js";

const router = express.Router();


// GET ALL ITEMS
router.get("/", getAllItems);


// GET ITEM BY ID
router.get("/:id", getItemById);


// CREATE ITEM - ADMIN ONLY
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  createItem
);


// UPDATE ITEM - ADMIN ONLY
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateItem
);


// DELETE ITEM - ADMIN ONLY
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteItem
);


export default router;