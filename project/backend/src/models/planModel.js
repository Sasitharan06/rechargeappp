const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    operator: {
      type: String,
      enum: ["AIRTEL"],
      default: "AIRTEL"
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number
    },
    validity: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    benefits: {
      type: [String],
      default: []
    },
    popular: {
      type: Boolean,
      default: false
    },
    discount: {
      type: String
    },
    badge: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
