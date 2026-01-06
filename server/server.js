/***********************
 * LOAD ENV VARIABLES
 ***********************/
require("dotenv").config();

/***********************
 * IMPORTS
 ***********************/
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

/***********************
 * APP SETUP
 ***********************/
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/***********************
 * DATABASE CONNECTION
 ***********************/
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

/***********************
 * MULTER CONFIG
 ***********************/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

/***********************
 * AUTH ROUTES
 ***********************/
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE Username = ? AND Password = ?";
  db.query(q, [username, password], (err, result) => {
    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

/***********************
 * PRODUCTS ROUTES
 ***********************/
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("PRODUCTS ERROR:", err);
      return res.status(500).json({ message: "Error fetching products" });
    }
    res.json(result);
  });
});

app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = `
    INSERT INTO products (Name, Description, Price, Stock, Image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(q, [name, description, price, stock || 0, image], (err) => {
    if (err) {
      console.error("ADD PRODUCT ERROR:", err);
      return res.status(500).json({ message: "Error adding product" });
    }
    res.json({ success: true });
  });
});

/***********************
 * PROGRAMS ROUTES
 ***********************/
app.get("/api/programs", (req, res) => {
  db.query("SELECT * FROM programs", (err, result) => {
    if (err) {
      console.error("PROGRAMS ERROR:", err);
      return res.status(500).json({ message: "Error fetching programs" });
    }
    res.json(result);
  });
});

app.post("/api/programs", upload.single("image"), (req, res) => {
  const { name, description, price, duration } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = `
    INSERT INTO programs (Name, Description, Price, Duration, Image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(q, [name, description, price, duration, image], (err) => {
    if (err) {
      console.error("ADD PROGRAM ERROR:", err);
      return res.status(500).json({ message: "Error adding program" });
    }
    res.json({ success: true });
  });
});

/***********************
 * ORDERS ROUTES (FIXED)
 ***********************/
app.post("/api/orders", (req, res) => {
  const { userId, totalPrice, items } = req.body;

  const orderQuery =
    "INSERT INTO orders (UserID, TotalAmount) VALUES (?, ?)";

  db.query(orderQuery, [userId, totalPrice], (err, orderResult) => {
    if (err) {
      console.error("ORDER ERROR:", err);
      return res.status(500).json({ success: false });
    }

    const orderId = orderResult.insertId;

    const insertItem = (item) =>
      new Promise((resolve, reject) => {
        const q = `
          INSERT INTO order_items
          (OrderID, ProductID, ProgramID, Quantity, Price, ItemType)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
          q,
          [
            orderId,
            item.type === "product" ? item.id : null,
            item.type === "program" ? item.id : null,
            item.quantity || 1,
            item.price,
            item.type
          ],
          (err) => (err ? reject(err) : resolve())
        );
      });

    Promise.all(items.map(insertItem))
      .then(() =>
        res.json({ success: true, orderId })
      )
      .catch((err) => {
        console.error("ORDER ITEMS ERROR:", err);
        res.status(500).json({ success: false });
      });
  });
});

/***********************
 * ADMIN ROUTES
 ***********************/
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("USERS ERROR:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
});

app.get("/api/statistics", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, r1) => {
    stats.totalUsers = r1[0].totalUsers;

    db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, r2) => {
      stats.totalProducts = r2[0].totalProducts;

      db.query("SELECT COUNT(*) AS totalPrograms FROM programs", (err, r3) => {
        stats.totalPrograms = r3[0].totalPrograms;

        db.query("SELECT COUNT(*) AS totalOrders FROM orders", (err, r4) => {
          stats.totalOrders = r4[0].totalOrders;

          db.query(
            "SELECT SUM(TotalAmount) AS totalRevenue FROM orders",
            (err, r5) => {
              stats.totalRevenue = r5[0].totalRevenue || 0;

              db.query(
                "SELECT * FROM orders ORDER BY OrderDate DESC LIMIT 5",
                (err, r6) => {
                  stats.recentOrders = r6;
                  res.json(stats);
                }
              );
            }
          );
        });
      });
    });
  });
});

/***********************
 * START SERVER
 ***********************/
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
