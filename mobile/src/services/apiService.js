import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle network errors
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error('Network Error: Cannot connect to backend server');
      return Promise.reject({
        success: false,
        message: 'Cannot connect to server. Please check:\n1. Backend is running\n2. Correct IP address in api.js\n3. Same WiFi network',
      });
    }

    if (error.response?.status === 401) {
      // Token expired or invalid
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('userType');
      AsyncStorage.removeItem('user');
    }

    // Return error in consistent format
    return Promise.reject(
      error.response?.data || {
        success: false,
        message: error.message || 'An error occurred',
      }
    );
  }
);

// User API Services
export const userAPI = {
  register: (data) => apiClient.post(API_ENDPOINTS.USER_REGISTER, data),
  login: (data) => apiClient.post(API_ENDPOINTS.USER_LOGIN, data),
  getProfile: () => apiClient.get(API_ENDPOINTS.USER_PROFILE),
  updateProfile: (formData) => apiClient.post(API_ENDPOINTS.USER_UPDATE_PROFILE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  bookAppointment: (data) => apiClient.post(API_ENDPOINTS.USER_BOOK_APPOINTMENT, data),
  getAppointments: () => apiClient.get(API_ENDPOINTS.USER_APPOINTMENTS),
  cancelAppointment: (data) => apiClient.post(API_ENDPOINTS.USER_CANCEL_APPOINTMENT, data),
  createRazorpayOrder: (data) => apiClient.post(API_ENDPOINTS.USER_PAYMENT_RAZORPAY, data),
  verifyRazorpay: (data) => apiClient.post(API_ENDPOINTS.USER_VERIFY_RAZORPAY, data),
};

// Doctor API Services
export const doctorAPI = {
  getList: () => apiClient.get(API_ENDPOINTS.DOCTOR_LIST),
  login: (data) => apiClient.post(API_ENDPOINTS.DOCTOR_LOGIN, data),
  getAppointments: () => apiClient.get(API_ENDPOINTS.DOCTOR_APPOINTMENTS),
  completeAppointment: (data) => apiClient.post(API_ENDPOINTS.DOCTOR_COMPLETE_APPOINTMENT, data),
  cancelAppointment: (data) => apiClient.post(API_ENDPOINTS.DOCTOR_CANCEL_APPOINTMENT, data),
  getDashboard: () => apiClient.get(API_ENDPOINTS.DOCTOR_DASHBOARD),
  getProfile: () => apiClient.get(API_ENDPOINTS.DOCTOR_PROFILE),
  updateProfile: (data) => apiClient.post(API_ENDPOINTS.DOCTOR_UPDATE_PROFILE, data),
};

// Admin API Services
export const adminAPI = {
  login: (data) => apiClient.post(API_ENDPOINTS.ADMIN_LOGIN, data),
  addDoctor: (formData) => apiClient.post(API_ENDPOINTS.ADMIN_ADD_DOCTOR, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAllDoctors: () => apiClient.get(API_ENDPOINTS.ADMIN_ALL_DOCTORS),
  changeAvailability: (data) => apiClient.post(API_ENDPOINTS.ADMIN_CHANGE_AVAILABILITY, data),
  getAppointments: () => apiClient.get(API_ENDPOINTS.ADMIN_APPOINTMENTS),
  cancelAppointment: (data) => apiClient.post(API_ENDPOINTS.ADMIN_CANCEL_APPOINTMENT, data),
  getDashboard: () => apiClient.get(API_ENDPOINTS.ADMIN_DASHBOARD),
};

export default apiClient;

