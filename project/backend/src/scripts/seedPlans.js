const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Plan = require("../models/planModel");

const plansData = [
    {
        name: 'Unlimited 719',
        price: 719,
        originalPrice: 799,
        validity: '84 days',
        type: 'Unlimited + Data',
        benefits: ['1.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Airtel Xstream Play'],
        popular: true,
        discount: '10% OFF',
        badge: '⭐ Best Seller',
        operator: 'AIRTEL'
    },
    {
        name: 'Data Booster 181',
        price: 181,
        originalPrice: 199,
        validity: '30 days',
        type: 'Data Add-on',
        benefits: ['1 GB/day extra', 'Works with active base plan', 'No expiry within 30 days'],
        discount: '9% OFF',
        operator: 'AIRTEL'
    },
    {
        name: 'OTT Combo 399',
        price: 399,
        originalPrice: 449,
        validity: '28 days',
        type: 'Unlimited + OTT',
        benefits: ['2.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'],
        popular: true,
        discount: '11% OFF',
        badge: '🎬 OTT Special',
        operator: 'AIRTEL'
    },
    {
        name: 'Value 179',
        price: 179,
        originalPrice: 199,
        validity: '28 days',
        type: 'Unlimited',
        benefits: ['2 GB total data', 'Unlimited calls', '300 SMS'],
        discount: '10% OFF',
        operator: 'AIRTEL'
    },
    {
        name: 'Annual 2999',
        price: 2999,
        originalPrice: 3499,
        validity: '365 days',
        type: 'Unlimited',
        benefits: ['2 GB/day', 'Unlimited calls', '100 SMS/day', 'Apollo 24/7, Wynk Premium'],
        discount: '14% OFF',
        badge: '💰 Best Value',
        operator: 'AIRTEL'
    },
    {
        name: 'Student Saver 155',
        price: 155,
        originalPrice: 199,
        validity: '24 days',
        type: 'Budget',
        benefits: ['1 GB total data', 'Unlimited calls', '300 SMS'],
        discount: '22% OFF',
        badge: '🎓 Student Plan',
        operator: 'AIRTEL'
    },
];

const seedDB = async () => {
    await connectDB();

    try {
        await Plan.deleteMany({});
        await Plan.insertMany(plansData);
        console.log("Data Seeded Successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
