const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");
const incidentModel = require("../models/incidentReportingModel");
const authMiddleware = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  
  try {
    const { name, username, password} = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ message: "Missing Details" });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      name,
      username,
      password: hashPassword,
    
    });

    return res.status(200).json({ message: "Admin registered Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing Details" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username,
        name: admin.name,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).json({
      token,
      message: "User logged in Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getIncidents", authMiddleware, async (req, res) => {
  try {
    const incidents = await incidentModel.find(); // Fetch all incidents
    return res.status(200).json({
      message: "Successfully retrieved incidents",
      incidents,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/verify/:id", authMiddleware, async (req, res) => {
  try {
      const { id } = req.params;

      // Find the incident by ID and update its status
      const updatedIncident = await incidentModel.findByIdAndUpdate(
          id,
          { verifiedStatus: "Verified" },
          { new: true } // Return the updated document
      );

      if (!updatedIncident) {
          return res.status(404).json({ message: "Incident not found" });
      }

      res.status(200).json({ message: "Incident verified successfully", incident: updatedIncident });
  } catch (error) {
      console.error("Error verifying incident:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;