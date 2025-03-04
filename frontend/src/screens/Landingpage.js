import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const LandingPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity = 0

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds fade-in
      useNativeDriver: true,
    }).start();

    // Delay before fade-out starts
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade-out
        duration: 800, // 0.8 seconds fade-out
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('HomeScreen'); // Navigate to HomeScreen
      });
    }, 2000); // 2s delay after fade-in before fade-out begins
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../../assets/RescueLink.png')} // Replace with actual logo path
        style={[styles.logo, { opacity: fadeAnim }]} 
      />
      <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
        RescueLink
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  logo: {
    width: 400,  
    height: 200, 
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 50,
    color: '#1eaad1',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
});

export default LandingPage;
