import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DoctorDashboardScreen from '../screens/doctor/DashboardScreen';
import DoctorAppointmentsScreen from '../screens/doctor/AppointmentsScreen';
import DoctorProfileScreen from '../screens/doctor/ProfileScreen';

const Tab = createBottomTabNavigator();

const DoctorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DoctorDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Appointments" 
        component={DoctorAppointmentsScreen}
        options={{ title: 'Appointments' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={DoctorProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default DoctorNavigator;

