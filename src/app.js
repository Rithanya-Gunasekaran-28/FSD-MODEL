const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const Service = require("./models/Service");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/services", async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving service records"
        });
    }
});

app.post("/services", async (req, res) => {
    try {
        const service = new Service(req.body);
        const savedService = await service.save();

        res.status(201).json({
            message: "Service record added successfully",
            service: savedService
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

app.delete("/services/:serviceId", async (req, res) => {
    try {
        const deletedService = await Service.findOneAndDelete({
            serviceId: req.params.serviceId
        });

        if (!deletedService) {
            return res.status(404).json({
                message: "Service record not found"
            });
        }

        res.json({
            message: "Service record deleted successfully",
            service: deletedService
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});