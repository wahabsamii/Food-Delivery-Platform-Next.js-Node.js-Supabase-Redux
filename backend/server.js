import express from "express";
import "dotenv/config";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/orders.js";
import foodRoutes from "./routes/items.js";
import categoryRoutes from "./routes/category.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Food Coriars Backend Running");
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      db: "connected",
      time: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      db: "error",
      message: err.message,
    });
  }
});

connectCloudinary();

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/category", categoryRoutes);

export default app;
// app.listen(5000, () => console.log('server', 5000));