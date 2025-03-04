import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './src/screens/Landingpage';  // Import LandingPage
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainPage from './src/screens/MainPage';
import QuickAssistant from './src/screens/QuickAssistant';
import DetailsScreen from './src/screens/DetailsScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import EmergencyContactsScreen from './src/screens/EmergencyContacts';
import NewsScreen from './src/screens/NewsUpdate';
import Volunter from './src/screens/VolunteerScreen';
import IncidentReporting from './src/screens/IncidentReporting';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="QuickAssistant" component={QuickAssistant} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Contacts" component={EmergencyContactsScreen} />
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen name="Volunter" component={Volunter} />
        <Stack.Screen name="Incident" component={IncidentReporting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
