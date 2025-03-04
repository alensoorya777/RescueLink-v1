import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const VolunteerRegistration = () => {
  const [isVolunteer, setIsVolunteer] = useState(true);
  const scaleAnim = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

    useEffect(() =>{
        const checkUser =  async () => {
          const token = await AsyncStorage.getItem('authToken');
            try {
                const response = await axios.get(
                    'http://10.0.2.2:3000/volunteer/checkVolunteer',{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
        
                
                setIsVolunteer(response.data.isVolunteer);
                console.log("Volunteer = ", response.data.isVolunteer)
            } catch (err) {
                console.error("Error =", err);
            }
        }

        checkUser();
    }, [])

  const onRegister = async () => {
    animateButton();
    const latitude = 8.4697;
    const longitude = 76.9818;

    const token = await AsyncStorage.getItem('authToken');

    try {
        const response = await axios.post(
            'http://10.0.2.2:3000/volunteer/register',
            {
                latitude,
                longitude
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        
        setIsVolunteer(true);
    } catch (err) {
        console.error("Error =", err);
    }
};

  const onCancel = async () => {
    animateButton();
    const token = await AsyncStorage.getItem('authToken');


    try {
        const response = await axios.post(
            'http://10.0.2.2:3000/volunteer/delete',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setIsVolunteer(false);
    } catch (err) {
        console.error("Error =", err);
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons 
          name={isVolunteer ? "checkmark-circle" : "person-add"} 
          size={70} 
          color={isVolunteer ? "#1eaad1" : "#ff9800"} 
          style={styles.icon} 
        />
        <Text style={styles.title}>
          {isVolunteer ? "You're Already a Volunteer" : "Become a Volunteer"}
        </Text>
        <Text style={styles.text}>
          {isVolunteer
            ? "Thank you for being a volunteer! If you wish to opt-out, click below."
            : "Join the volunteer network to make an impact. Click below to register."}
        </Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.button,
              isVolunteer ? styles.cancelButton : styles.registerButton
            ]}
            onPress={isVolunteer ? onCancel : onRegister}
          >
            <Text style={styles.buttonText}>
              {isVolunteer ? "Cancel Registration" : "Register as Volunteer"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f5f5f5",
    padding: 20 
  },
  card: { 
    width: "90%", 
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 25, 
    borderRadius: 15, 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOpacity: 0.15, 
    shadowRadius: 10, 
    elevation: 5,
    backdropFilter: "blur(10px)",
  },
  icon: { marginBottom: 15 },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#333",
    textAlign: "center"
  },
  text: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 25, 
    color: "#555",
    paddingHorizontal: 10,
    lineHeight: 22
  },
  button: { 
    width: "100%", 
    paddingVertical: 15, 
    paddingHorizontal: 15,
    borderRadius: 10, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4
  },
  registerButton: { backgroundColor: "#1eaad1" },
  cancelButton: { backgroundColor: "#ff3b30" },
  buttonText: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "white",
    textTransform: "uppercase"
  }
});

export default VolunteerRegistration;
