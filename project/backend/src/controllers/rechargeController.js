const Recharge = require("../models/rechargeModel");

// GET all recharges
exports.getAllRecharges = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const recharges = await Recharge.find(filter).populate("userId", "name email").sort({ createdAt: -1 });
    res.json(recharges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE recharge
exports.createRecharge = async (req, res) => {
  try {
    const newRecharge = new Recharge(req.body);
    const savedRecharge = await newRecharge.save();
    res.status(201).json(savedRecharge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
