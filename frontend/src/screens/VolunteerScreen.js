import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import VolunteerRegistration from "../components/VolunteerRegisteration";
import NearbyVolunteers from "../components/NearbyVolunteer"; // Correct this import if needed

const Tab = createBottomTabNavigator();

const VolunteerScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === "Register"
              ? "person-add-outline"
              : "people-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1eaad1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f5f5f5" },
      })}
    >
      <Tab.Screen name="Register" component={VolunteerRegistration} />
      <Tab.Screen name="Nearby" component={NearbyVolunteers} />
    </Tab.Navigator>
  );
};

export default VolunteerScreen;
