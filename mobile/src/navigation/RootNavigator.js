import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import DoctorNavigator from './DoctorNavigator';
import AdminNavigator from './AdminNavigator';
import LoadingScreen from '../screens/common/LoadingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Always show Auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    );
  }

  // Show appropriate navigator based on user type
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userType === 'patient' ? (
        <Stack.Screen name="Patient" component={PatientNavigator} />
      ) : userType === 'doctor' ? (
        <Stack.Screen name="Doctor" component={DoctorNavigator} />
      ) : userType === 'admin' ? (
        <Stack.Screen name="Admin" component={AdminNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

