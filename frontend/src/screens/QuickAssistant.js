import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const options = [
  { name: "General First Aid", icon: "local-hospital" },
  { name: "CPR", icon: "favorite" },
  { name: "Choking", icon: "restaurant-menu" },
  { name: "Seizures", icon: "monitor-heart" },
  { name: "Broken Bones", icon: "personal-injury" },
  { name: "Burns", icon: "fireplace" },
  { name: "Electric Shock", icon: "bolt" },
  { name: "Drowning", icon: "waves" },
  { name: "Poisoning", icon: "science" },
  { name: "Accidents", icon: "directions-car" },
  { name: "Dog Bites", icon: "pets" },
  { name: "Snake Bites", icon: "coronavirus" },
  { name: "Earthquake", icon: "landslide" },
  { name: "Floods", icon: "water" },
  { name: "Landslides", icon: "terrain" },
];

const QuickAssistant = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => navigation.navigate("Details", { name: option.name })}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name={option.icon} size={40} color="white" />
            </View>
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuickAssistant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  option: {
    alignItems: "center",
    marginVertical: 15,
    width: "30%", // 3 icons per row
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 50, // Perfect circle
    backgroundColor: "#1eaad1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8, // Space between icon and text
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
  },
});
