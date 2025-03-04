
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
const API_URL = "http://10.0.2.2:3000/emergency/contacts";
const MainPage = ({navigation}) => {




  const [contacts, setContacts] = useState([]);
  const [location, setLocation] = useState(null);

  const loadContacts = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.error("No authentication token found!");
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
      console.log('✅ Contacts fetched:', data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required to send an emergency SMS.");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const sendEmergencySMS = async () => { 
    console.log("🚨 Attempting to send Emergency SMS...");

    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Error", "SMS service is not available on this device.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emergency contacts");
      }

      const contacts = await response.json();
      if (contacts.length === 0) {
        Alert.alert("No Contacts", "No emergency contacts found.");
        return;
      }

      const recipientNumbers = contacts.map((contact) => contact.phone);

      // await getCurrentLocation();
      // if (!location) {
      //   Alert.alert("Error", "Unable to fetch location.");
      //   return;
      // }
      const latitude = 8.4697;
      const longitude = 76.9818;
      const finalMessage = `Emergency! I need help. This is my location: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      console.log("🚨 Sending SMS to:", recipientNumbers, "Message:", finalMessage);

      const { result } = await SMS.sendSMSAsync(recipientNumbers, finalMessage);
      if (result === "sent") {
        Alert.alert("Success", "Emergency SMS sent successfully!");
      } else {
        Alert.alert("Failed", "Message was not sent.");
      }
    } catch (error) {
      console.error("❌ Error sending emergency SMS:", error);
      Alert.alert("Error", "Failed to send emergency SMS.");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);













  const handleButtonPress = (button) => {
    Alert.alert(`${button} button pressed`);
  };

  const handleChatbotPress = () => {
    Alert.alert('Chatbot button pressed');
  };

  const handleSignOut = () => {
    Alert.alert('Signed out');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Homepage</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => Alert.alert('Notification icon pressed')}>
            <MaterialIcons name="notifications" size={30} color="#1eaad1" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="exit-to-app" size={30} color="#1eaad1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Signal Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={sendEmergencySMS}>
        <Text style={styles.buttonText}>Emergency Signal</Text>
      </TouchableOpacity>

      {/* Emergency Contacts Button */}
      <TouchableOpacity
        style={styles.emergencyContactsButton}
        onPress={() => navigation.navigate('Contacts')}>
        <Text style={styles.buttonText}>Emergency Contacts</Text>
      </TouchableOpacity>

      {/* Grid Buttons */}
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('Incident')}>
          <Text style={styles.buttonText}>Report an Incident</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('Volunter')}>
          <Text style={styles.buttonText}>Volunteer Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('QuickAssistant')}>
          <Text style={styles.buttonText}>Quick Assist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('NewsScreen')}>
          <Text style={styles.buttonText}>News Updates</Text>
        </TouchableOpacity>
      </View>

      {/* Chatbot Floating Button */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate('Chatbot')}>
        <MaterialIcons name="chat" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1eaad1',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  emergencyButton: {
    backgroundColor: '#D90000',
    padding: 25,
    borderRadius: 100,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5, 
  },
  emergencyContactsButton: {
    backgroundColor: '#1eaad1',
    padding: 15,
    borderRadius: 50,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  gridButton: {
    backgroundColor: '#1eaad1',
    padding: 15,
    width: '45%',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1eaad1',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    elevation: 4, 
  },
});

export default MainPage;