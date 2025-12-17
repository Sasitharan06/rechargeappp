const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || "mongodb://localhost:27017/myproductDB";
    await mongoose.connect(connString);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;