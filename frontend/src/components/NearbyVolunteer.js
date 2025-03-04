import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get initials
const getInitials = (name) => name.split(" ").map((word) => word[0]).join("").toUpperCase();

const VolunteerCard = ({ name, phoneNumber }) => (
  <View style={styles.card}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(name)}</Text>
      </View>
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.detailRow}>
        <Ionicons name="call-outline" size={18} color="#1eaad1" />
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
    </View>
  </View>
);

const NearbyVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchNearbyVolunteers = async () => {
        try {
            // Hardcoded latitude & longitude
            const latitude = 8.4697;
            const longitude = 76.9818;
            // console.log('IN use effect')

            const token = await AsyncStorage.getItem('authToken');
        // Fetch nearby volunteers
        const response = await axios.get(
            `http://10.0.2.2:3000/volunteer/getNearbyVolunteers?latitude=${latitude}&longitude=${longitude}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
          
    

        // Correct field name based on backend response
        setVolunteers(response.data.nearByVolunteers);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    const interval = setInterval(() => {
      fetchNearbyVolunteers();
    }, 3000); // Fetch every 30 seconds
  
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Volunteers</Text>
      <FlatList
        data={volunteers}
        keyExtractor={(item) => item._id} // Assuming MongoDB _id
        renderItem={({ item }) => (
          <VolunteerCard 
            name={item.name} 
            phoneNumber={item.phoneNumber} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1eaad1",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1eaad1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 15,
    color: "#555",
    marginLeft: 8,
  },
});

export default NearbyVolunteers;
