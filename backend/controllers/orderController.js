import pool from "../config/db.js";


// CREATE NEW ORDER
export const createOrder = async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: "No items provided",
    });
  }

  try {
    let total = 0;
    const orderItems = [];

    // Get item prices from database
    for (const item of items) {
      if (!item.item_id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          error: "Invalid item or quantity",
        });
      }

      const result = await pool.query(
        "SELECT id, price FROM items WHERE id = $1",
        [item.item_id]
      );

      if (result.rows.length === 0) {
        return res.status(400).json({
          error: `Item ${item.item_id} not found`,
        });
      }

      const price = Number(result.rows[0].price);
      const quantity = Number(item.quantity);

      total += price * quantity;

      orderItems.push({
        item_id: item.item_id,
        quantity,
        price,
      });
    }

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user.id, total]
    );

    const orderId = orderResult.rows[0].id;

    // Create order items
    for (const item of orderItems) {
      await pool.query(
        `INSERT INTO order_items
         (order_id, item_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [
          orderId,
          item.item_id,
          item.quantity,
          item.price,
        ]
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: orderResult.rows[0],
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// GET CURRENT USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `
      SELECT
        o.id AS order_id,
        o.total,
        o.created_at
      FROM orders o
      WHERE o.user_id = $1
      ORDER BY o.id DESC
      `,
      [req.user.id]
    );

    const orders = ordersResult.rows;

    for (const order of orders) {
      const itemsResult = await pool.query(
        `
        SELECT
          oi.id AS order_item_id,
          i.id AS item_id,
          i.name AS item_name,
          i.image AS item_image,
          i.category AS item_category,
          oi.quantity,
          oi.price
        FROM order_items oi
        JOIN items i ON oi.item_id = i.id
        WHERE oi.order_id = $1
        `,
        [order.order_id]
      );

      order.items = itemsResult.rows;
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get my orders error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// GET ALL ORDERS - ADMIN
export const getAllOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `
      SELECT
        o.id AS order_id,
        o.user_id,
        u.name AS user_name,
        u.email AS user_email,
        o.total,
        o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.id DESC
      `
    );

    const orders = ordersResult.rows;

    for (const order of orders) {
      const itemsResult = await pool.query(
        `
        SELECT
          oi.id AS order_item_id,
          i.id AS item_id,
          i.name AS item_name,
          i.image AS item_image,
          i.category AS item_category,
          oi.quantity,
          oi.price
        FROM order_items oi
        JOIN items i ON oi.item_id = i.id
        WHERE oi.order_id = $1
        `,
        [order.order_id]
      );

      order.items = itemsResult.rows;
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};


// GET ORDER BY ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const orderResult = await pool.query(
      `
      SELECT
        o.id AS order_id,
        o.user_id,
        u.name AS user_name,
        u.email AS user_email,
        o.total,
        o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
      `,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    const order = orderResult.rows[0];

    // Normal user can only view their own order
    if (
      req.user.role !== "admin" &&
      order.user_id !== req.user.id
    ) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    const itemsResult = await pool.query(
      `
      SELECT
        oi.id AS order_item_id,
        i.id AS item_id,
        i.name AS item_name,
        i.image AS item_image,
        i.category AS item_category,
        oi.quantity,
        oi.price
      FROM order_items oi
      JOIN items i ON oi.item_id = i.id
      WHERE oi.order_id = $1
      `,
      [id]
    );

    order.items = itemsResult.rows;

    res.status(200).json(order);
  } catch (error) {
    console.error("Get order error:", error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
};