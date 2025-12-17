const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Plan = require("../models/planModel");

const debugDB = async () => {
    await connectDB();

    try {
        const allPlans = await Plan.find({});
        console.log("Total Plans in DB:", allPlans.length);

        const airtelPlans = await Plan.find({ operator: 'AIRTEL' });
        console.log("AIRTEL Plans:", airtelPlans.length);

        if (allPlans.length > 0) {
            console.log("Sample Plan Operator:", allPlans[0].operator);
            console.log("Sample Plan Name:", allPlans[0].name);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugDB();
