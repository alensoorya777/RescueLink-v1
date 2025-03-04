const express = require("express");
const router = express.Router();
//
const firebaseAdmin = require('firebase-admin');
// Initialize Firebase Admin SDK with your service account
const serviceAccount = require('../integration-2181a-firebase-adminsdk-fbsvc-ca24cf94be.json'); // Path to your Firebase Admin SDK JSON file
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
//

const incidentModel = require("../models/incidentReportingModel");
const authMiddleware = require("../middleware/auth");
const userModel = require("../models/userModel");
const axios = require('axios')


// Directly send a test notification when the server starts
const sendPushNotification = (nearbyUsers) => {
  // Get all valid device tokens from nearby users
  const tokens = nearbyUsers.map(user => user.fcmToken).filter(token => token);

  // Message to send
  const message = {
    notification: {
      title: 'Test Notification',
      body: 'This is a test message sent to your device.',
    },
  };

  // Loop through all tokens and send the notification
  tokens.forEach(token => {
    firebaseAdmin.messaging().sendToDevice(token, message)
      .then((response) => {
        console.log('Successfully sent message to', token, ':', response);
      })
      .catch((error) => {
        console.error('Error sending message to', token, ':', error);
      });
  });
};





async function reverseGeocode(latitude, longitude) {
  try {
    const apiKey = process.env.AIzaSyAlvDEZQaUR3jqVUNdJjzlBX8ByL9LB5sM;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (response.data.status !== "OK") {
      console.log("Reverse Geocoding failed:", response.data.status);
      return {};
    }

    const results = response.data.results;
    const addressComponents =
      results.length > 0 ? results[0].address_components : [];

    console.log("Full address components:", addressComponents); // Debugging log

    const getAddressComponent = (types) => {
      const component = addressComponents.find((comp) =>
        types.some((type) => comp.types.includes(type))
      );
      return component ? component.long_name : "NA";
    };

    return {
      country: getAddressComponent(["country"]),
      state: getAddressComponent(["administrative_area_level_1"]),
      district: getAddressComponent([
        "administrative_area_level_2",
        "administrative_area_level_3",
      ]), // Use level_3 as fallback
      place: getAddressComponent(["locality", "sublocality", "neighborhood"]),
    };
  } catch (err) {
    console.error("Reverse Geocoding failed:", err);
    return {};
  }
}

router.post("/report", authMiddleware, async (req, res) => {
  console.log('Report')
  try {
    const { longitude, latitude, type,title, description } = req.body;
    const user = req.user;
    console.log('Report = ',type )
    if (!user.userId || !longitude || !latitude || !title || !description  || !type) {
      return res.status(400).json({
        message: "Missing Data",
      });
    }
    // Perform Reverse Geocoding
    const locationData = await reverseGeocode(latitude, longitude);
    const country = locationData.country || "NA";
    const state = locationData.state || "NA";
    const district = locationData.district || "NA";
    const place = locationData.place || "NA";
    
    const incidentReport = await incidentModel.create({
      userId: user.userId,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      title,
      description,
      type,
      country,
      state,
      district,
      locality: place,
      reporterName: user.name,
      phoneNumber: user.phoneNo,
    });
    //  Logic for reteriving users within the radius of user reporting the incident

    const referenceLocation = [longitude, latitude];

    const nearbyUsers = await userModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: referenceLocation },
          $maxDistance: 5000, // Distance in meters
        },
      },
    });

    //fcm part



    sendPushNotification(nearbyUsers)






    console.log(nearbyUsers)
    res.status(200).json({
      nearbyUsers,
      message: "Incident reported Successfully",
    });
  } catch (err) {
    console.error("Error during user reporting:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
