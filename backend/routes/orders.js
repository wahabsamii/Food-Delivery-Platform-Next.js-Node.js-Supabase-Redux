import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();


// CREATE NEW ORDER
// Logged-in users
router.post(
  "/",
  authenticate,
  createOrder
);


// GET CURRENT USER ORDERS
// Logged-in users
router.get(
  "/",
  authenticate,
  getMyOrders
);


// GET ALL ORDERS
// Admin only
router.get(
  "/all",
  authenticate,
  authorize(["admin"]),
  getAllOrders
);


// GET ORDER BY ID
// User can see own order
// Admin can see any order
router.get(
  "/:id",
  authenticate,
  getOrderById
);


export default router;