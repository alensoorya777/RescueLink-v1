const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const userModel = require("../models/userModel");

// Reverse Geocoding function
async function reverseGeocode(latitude, longitude) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (response.data.status !== "OK") {
      console.log("Reverse Geocoding failed:", response.data.status);
      return {};
    }

    const results = response.data.results;
    const addressComponents = results.length > 0 ? results[0].address_components : [];

  

    const getAddressComponent = (types) => {
      const component = addressComponents.find((comp) => types.some((type) => comp.types.includes(type)));
      return component ? component.long_name : "NA";
    };

    return {
      country: getAddressComponent(["country"]),
      state: getAddressComponent(["administrative_area_level_1"]),
      district: getAddressComponent(["administrative_area_level_2", "administrative_area_level_3"]),
      place: getAddressComponent(["locality", "sublocality", "neighborhood"]),
    };
  } catch (err) {
    console.error("Reverse Geocoding failed:", err);
    return {};
  }
}

// API for registering a user
router.post("/register", async (req, res) => {
  console.log("signup hit");
  try {
    const { name, email, password, phoneNo, latitude, longitude } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNo || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered with this email" });
    }

    // Perform Reverse Geocoding
    const locationData = await reverseGeocode(latitude, longitude);
    const country = locationData.country || "NA";
    const state = locationData.state || "NA";
    const district = locationData.district || "NA";
    const place = locationData.place || "NA";

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Add new user to the database
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      phoneNo,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      country,
      state,
      district,
      place,
    });

    // Return success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API for login
router.post("/login", async (req, res) => {
  console.log('Login Route hit')
  try {
    const { email, password, fcmToken } = req.body;

    // Check if email and password are provided
    if (!email || !password || !fcmToken) {
      return res.status(400).json({ message: "Email and password, token are required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or password is incorrect" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password is incorrect" });
    }

    user.fcmToken = fcmToken;
    await user.save()

    // Create a token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        phoneNo: user.phoneNo,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ token, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
