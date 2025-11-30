import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AdminDashboardScreen from '../screens/admin/DashboardScreen';
import AdminDoctorsScreen from '../screens/admin/DoctorsScreen';
import AdminAppointmentsScreen from '../screens/admin/AppointmentsScreen';
import AddDoctorScreen from '../screens/admin/AddDoctorScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DoctorsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DoctorsList" 
      component={AdminDoctorsScreen}
      options={{ title: 'All Doctors' }}
    />
    <Stack.Screen 
      name="AddDoctor" 
      component={AddDoctorScreen}
      options={{ title: 'Add Doctor' }}
    />
  </Stack.Navigator>
);

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Doctors') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={AdminDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Doctors" 
        component={DoctorsStack}
        options={{ title: 'Doctors', headerShown: false }}
      />
      <Tab.Screen 
        name="Appointments" 
        component={AdminAppointmentsScreen}
        options={{ title: 'Appointments' }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;

