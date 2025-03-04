import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

const IncidentReportingScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Request permission for push notifications
    messaging()
      .requestPermission()
      .then((authStatus) => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log("Authorization status:", authStatus);
        } else {
          console.log("Permission not granted for push notifications");
        }
      });

    // Foreground message handler
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground message received:", remoteMessage);

      // Ensure Alert is shown in the foreground
      Alert.alert(
        "Push Notification",
        remoteMessage.notification.body, // Use the message body for the alert
        [{ text: "OK" }] // Add any actions as needed
      );
    });

    // Cleanup on component unmount
    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    // Ensure title, incidentType, and description are defined or from state/input fields
    console.log("Incident Details:", {
      title,
      incidentType,
      description,
    });

    try {
      // Retrieve the authToken from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("No token found, please login again.");
        return;
      }

      // Coordinates for the incident (replace with dynamic data if available)
      const latitude = 8.4697;
      const longitude = 76.9818;

      // Make the API call to report the incident
      const response = await axios.post(
        "http://10.0.2.2:3000/incident/report",
        { latitude, longitude, title, type: incidentType, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response (success message or further actions)
      if (response.status === 200) {
        console.log("Incident reported successfully:", response.data);
        // You can navigate to another screen or show a success message here
      } else {
        console.log("Failed to report incident:", response.data);
      }
    } catch (err) {
      // Log and handle the error if the request fails
      console.log("Error reporting incident:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/reporting.png")} style={styles.image} />
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Incident Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Give a title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Type of Incident</Text>
        <TextInput
          style={styles.input}
          placeholder="(e.g. Fire, Accident)"
          value={incidentType}
          onChangeText={setIncidentType}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Brief description about the incident"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 3,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10, // Space below header
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    color: "#333",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#1eaad1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IncidentReportingScreen;
