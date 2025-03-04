import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setToken] = useState('')

  useEffect(() => {
    // Get device push token and log it
    messaging()
      .getToken()
      .then(token => {
        console.log('Device Push Token:', token);
        setToken(token)
      });

    // Cleanup the listener when the component is unmounted
   // return unsubscribe;
  }, []);





  const handleLogin = async () => {
    try {
      // const response = await fetch('http://192.168.1.5:3000/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      console.log("Email", email);
      console.log("Password", password)
      const response = await axios.post('http://10.0.2.2:3000/user/login', {
        email,
        password,
        fcmToken,
      })
      

      if (response.status === 200) {
        // Alert.alert('', );
        console.log("Login successful");
        navigation.navigate('MainPage');

        // Save the token to AsyncStorage
        await AsyncStorage.setItem('authToken', response.data.token);
      } else {
        Alert.alert('Sorry');
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Unable to connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f0f8ff', '#f0f8ff']} style={styles.backgroundGradient}>
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient colors={['#1eaad1', '#1eaad1']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#1eaad1',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginBottom: 15,
    color: '#111111',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow position
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 4, // Blur radius
    elevation: 5, // Android shadow
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Poppins_700Bold',
  },
});

export default LoginScreen;
