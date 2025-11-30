import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/patient/HomeScreen';
import DoctorsScreen from '../screens/patient/DoctorsScreen';
import AppointmentsScreen from '../screens/patient/AppointmentsScreen';
import ProfileScreen from '../screens/patient/ProfileScreen';
import DoctorProfileScreen from '../screens/patient/DoctorProfileScreen';
import BookingScreen from '../screens/patient/BookingScreen';
import PaymentScreen from '../screens/patient/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="DoctorProfile" 
      component={DoctorProfileScreen}
      options={{ title: 'Doctor Profile' }}
    />
    <Stack.Screen 
      name="Booking" 
      component={BookingScreen}
      options={{ title: 'Book Appointment' }}
    />
    <Stack.Screen 
      name="Payment" 
      component={PaymentScreen}
      options={{ title: 'Payment' }}
    />
  </Stack.Navigator>
);

const DoctorsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DoctorsMain" 
      component={DoctorsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="DoctorProfile" 
      component={DoctorProfileScreen}
      options={{ title: 'Doctor Profile' }}
    />
    <Stack.Screen 
      name="Booking" 
      component={BookingScreen}
      options={{ title: 'Book Appointment' }}
    />
    <Stack.Screen 
      name="Payment" 
      component={PaymentScreen}
      options={{ title: 'Payment' }}
    />
  </Stack.Navigator>
);

const PatientNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Doctors') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Doctors" component={DoctorsStack} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default PatientNavigator;

