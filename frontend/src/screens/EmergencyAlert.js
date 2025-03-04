import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
//import axios from 'axios';

const EmergencyAlert = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState(null);

  // Fetch emergency contacts on load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://192.0.2.2:3000/emergency/contacts', {
          params: { username: 'jacob' },
        });
        setEmergencyContacts(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Request location permission and get current location
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to retrieve location.');
    }
  };

  // Send emergency SMS (simulated in Expo)
  const sendEmergencySMS = async (recipients) => {
    await getCurrentLocation();

    if (!location) {
      Alert.alert('Error', 'Location not available.');
      return;
    }

    const message = `Emergency! I need help. My current location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    Alert.alert('Emergency SMS', `Message: ${message}\nRecipients: ${recipients.join(', ')}`);
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.post('http://192.168.1.45:3000/emergency/deleteContact', {
        username: 'jacob',
        contactId,
      });
      setEmergencyContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactsCard}>
      <Text style={styles.contactText}>{item.name}</Text>
      <Text style={styles.contactText}>
        <MaterialIcons name="call" size={20} color="green" />: {item.phoneNumber}
      </Text>
      <View style={styles.options}>
        <Pressable style={styles.deleteButton} onPress={() => deleteContact(item._id)}>
          <AntDesign name="delete" size={30} color="red" />
        </Pressable>
        <Pressable
          style={styles.smsButtonforSingleContact}
          onPress={() => sendEmergencySMS([item.phoneNumber])}
        >
          <Text style={styles.smsButtonforSingleContactText}>Send SMS</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="contact-emergency" size={35} color="red" />
        <Text style={styles.heading}>Emergency Contacts</Text>
      </View>

      <View style={styles.mainButtonsView}>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={25} color="#0096FF" />
        </Pressable>
        <Pressable
          style={styles.smsButton}
          onPress={() => sendEmergencySMS(emergencyContacts.map((contact) => contact.phoneNumber))}
        >
          <Text style={styles.smsButtonText}>Send SMS</Text>
        </Pressable>
      </View>

      <FlatList
        data={emergencyContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </SafeAreaView>
  );
};

export default EmergencyAlert;

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: '4%',
    flex: 1,
    backgroundColor: '#ffffff',
    gap: 20,
  },
  heading: {
    fontSize: 32,
    textAlign: 'center',
  },
  mainButtonsView: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0096FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: '#E6F7FF',
  },
  smsButtonforSingleContact: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF4500',
    paddingVertical: 4,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smsButtonforSingleContactText: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: 'bold',
  },
  smsButton: {
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smsButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  contactsCard: {
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '3%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  contactText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  phoneIcon: {
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
  },
});
