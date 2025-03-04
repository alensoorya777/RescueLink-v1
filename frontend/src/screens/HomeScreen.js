import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Show a loading screen if fonts are still loading
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <Image source={require('../../assets/RescueLink.png')} style={styles.logo} resizeMode="contain" />
      
      {/* Title Section */}
      <View style={styles.contentWrapper}>
        <Text style={styles.mainTitle}>RescueLink</Text>
        <Text style={styles.subTitle}>Real-time Emergency and Safety Network</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ActionButton
            icon="person-add"
            text="Sign Up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
          <ActionButton
            icon="log-in"
            text="Login"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>
      </View>
      
      {/* App Description */}
      <Text style={styles.appDescription}>
        A smart Disaster Management Response application aimed to provide services during the time of disasters or hazards. Sign up now!
      </Text>
    </SafeAreaView>
  );
};

// Reusable Action Button Component
const ActionButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#ffffff" style={styles.icon} />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, // Increased space below the logo
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 50,
    color: '#1eaad1',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1eaad1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center', // Center align text
    flex: 1, // Ensure text takes available space for proper alignment
  },
  icon: {
    marginRight: 10,
  },
  appDescription: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
