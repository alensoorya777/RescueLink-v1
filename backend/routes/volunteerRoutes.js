const express = require("express");
const router = express.Router();

const volunteerModel = require("../models/volunterModel");
const authMiddleware = require('../middleware/auth')

router.post("/register", authMiddleware, async (req, res) => {
  try {
    
    const { name, phoneNo } = req.user;
    const {  latitude, longitude } = req.body;

    if (!name || !phoneNo) {
      return res.status(400).json({
        message: "Invalid user credentials in token",
      });
    }
    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Location not found",
      });
    }
    const existingVolunteer = await volunteerModel.findOne({ phoneNumber: phoneNo });

    if(existingVolunteer){
        return res.status(400).json({
            message: " Volunteer exists already ",
          });
    }
    await volunteerModel.create({
      name,
      phoneNumber: phoneNo,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      
    });

    return res.status(200).json({
      message: "Volunteer registered Successfully",
    });
  } catch (err) {
    console.log("Error = ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// route for deleting volunteer

router.post("/delete",   authMiddleware, async (req, res) => {
  try {
    const { phoneNo } = req.user;

    if (!phoneNo) {
      return res.status(400).json({
        message: "No phoneNo found ",
      });
    }
    const volunteer = await volunteerModel.findOne({ phoneNumber: phoneNo });
    if (!volunteer) {
      return res.status(400).json({
        message: "Volunteer does not exist ",
      });
    }
    await volunteerModel.deleteOne({ phoneNumber: phoneNo });

    res.status(200).json({
      message: "Volunteer deleted",
    });
  } catch {
    console.log("Error = ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// route for getting volunteers in nearby location

router.get("/getNearbyVolunteers",  authMiddleware, async (req, res) => {
  
    try {
      // get userlocation using query
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Coordinates are missing, INternal server error",
      });
    }

    const referenceLocation = [parseFloat(longitude), parseFloat(latitude)];

    const nearByVolunteers = await volunteerModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: referenceLocation },
          $maxDistance: 10000,// in meters
        },
      },
    });
    return res.status(200).json({
      message: "Volunteers retrieved Successfully",
      nearByVolunteers,
    });
  } catch(err) {
    console.log("Error = ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


// route to check if the user is a Volunteer or not

router.get('/checkVolunteer', authMiddleware, async (req, res) => {
  try{
    const {phoneNo} = req.user;
    if (!phoneNo) {
      return res.status(400).json({
        message: "No phoneNo found ",
      });
    }

    const isVolunteer  = await volunteerModel.findOne({phoneNumber: phoneNo}) ? true : false;
    return res.status(200).json({
      isVolunteer 
    })
  }catch(err){
    return res.status(500).json({
      message: 'Internal Server Error try again Later',
    })
  }
})
module.exports = router;
