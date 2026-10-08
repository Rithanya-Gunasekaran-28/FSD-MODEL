const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
        unique: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    serviceDate: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Service", serviceSchema);