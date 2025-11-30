import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // 'patient', 'doctor', 'admin'
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password, userType);
      setLoading(false);

      if (!result.success) {
        // Check if it's a network error
        if (result.message?.includes('Cannot connect') || result.message?.includes('Network Error')) {
          Alert.alert(
            'Connection Error',
            'Cannot connect to backend server.\n\nFor physical device:\n1. Update IP address in src/config/api.js\n2. Ensure backend is running\n3. Check same WiFi network'
          );
        } else {
          Alert.alert('Login Failed', result.message);
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error',
        error.message || 'An unexpected error occurred. Please check your connection.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Doc+</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.userTypeContainer}>
            <Button
              title="Patient"
              onPress={() => setUserType('patient')}
              style={[
                styles.userTypeButton,
                userType === 'patient' && styles.userTypeButtonActive,
              ]}
              textStyle={userType === 'patient' && styles.userTypeButtonTextActive}
            />
            <Button
              title="Doctor"
              onPress={() => setUserType('doctor')}
              style={[
                styles.userTypeButton,
                userType === 'doctor' && styles.userTypeButtonActive,
              ]}
              textStyle={userType === 'doctor' && styles.userTypeButtonTextActive}
            />
            <Button
              title="Admin"
              onPress={() => setUserType('admin')}
              style={[
                styles.userTypeButton,
                userType === 'admin' && styles.userTypeButtonActive,
              ]}
              textStyle={userType === 'admin' && styles.userTypeButtonTextActive}
            />
          </View>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          {userType === 'patient' && (
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('Register')}
              >
                Register
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  userTypeButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  userTypeButtonActive: {
    backgroundColor: '#4A90E2',
  },
  userTypeButtonTextActive: {
    color: '#fff',
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default LoginScreen;

