require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const userRoutes = require("./src/routes/userRoutes");
const rechargeRoutes = require("./src/routes/rechargeRoutes");
const planRoutes = require("./src/routes/planRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(require('cors')());

// Database connection
connectDB();

// Routes

app.use("/users", userRoutes);
app.use("/recharges", rechargeRoutes);
app.use("/plans", planRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Server start
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
