import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userAPI, doctorAPI, adminAPI } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'patient', 'doctor', 'admin'
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserType = await AsyncStorage.getItem('userType');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUserType) {
        setToken(storedToken);
        setUserType(storedUserType);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, type) => {
    try {
      let response;
      
      if (type === 'patient') {
        response = await userAPI.login({ email, password });
      } else if (type === 'doctor') {
        response = await doctorAPI.login({ email, password });
      } else if (type === 'admin') {
        response = await adminAPI.login({ email, password });
      }

      if (response.success) {
        const token = response.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userType', type);
        setToken(token);
        setUserType(type);
        
        // Fetch user profile
        await fetchUserProfile(type);
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await userAPI.register({ name, email, password });
      
      if (response.success) {
        const token = response.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userType', 'patient');
        setToken(token);
        setUserType('patient');
        
        await fetchUserProfile('patient');
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const fetchUserProfile = async (type) => {
    try {
      let response;
      
      if (type === 'patient') {
        response = await userAPI.getProfile();
      } else if (type === 'doctor') {
        response = await doctorAPI.getProfile();
      }
      
      if (response.success) {
        const userData = response.userData || response.profileData;
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userType');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setUserType(null);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    userType,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    fetchUserProfile,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

