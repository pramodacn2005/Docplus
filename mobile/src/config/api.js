// API Configuration
// IMPORTANT: For physical device testing, use your computer's IP address instead of localhost

// Your computer's IP address (found via: ipconfig on Windows)
const YOUR_IP_ADDRESS = '192.168.1.106'; // Update this if your IP changes

// Set to true when testing on physical device, false for emulator/simulator
const IS_PHYSICAL_DEVICE = true; // Change to false for emulator

const getBaseURL = () => {
  if (__DEV__) {
    if (IS_PHYSICAL_DEVICE) {
      // For physical device - use your computer's IP address
      return `http://${YOUR_IP_ADDRESS}:4000/api`;
    } else {
      // For emulator/simulator - use localhost or 10.0.2.2 for Android emulator
      // Android emulator: 'http://10.0.2.2:4000/api'
      // iOS simulator: 'http://localhost:4000/api'
      return 'http://localhost:4000/api';
    }
  }
  return 'https://your-backend-url.com/api';
};

export const API_BASE_URL = getBaseURL();

export const API_ENDPOINTS = {
  // User endpoints
  USER_REGISTER: '/user/register',
  USER_LOGIN: '/user/login',
  USER_PROFILE: '/user/get-profile',
  USER_UPDATE_PROFILE: '/user/update-profile',
  USER_BOOK_APPOINTMENT: '/user/book-appointment',
  USER_APPOINTMENTS: '/user/appointments',
  USER_CANCEL_APPOINTMENT: '/user/cancel-appointment',
  USER_PAYMENT_RAZORPAY: '/user/payment-razorpay',
  USER_VERIFY_RAZORPAY: '/user/verifyRazorpay',
  
  // Doctor endpoints
  DOCTOR_LIST: '/doctor/list',
  DOCTOR_LOGIN: '/doctor/login',
  DOCTOR_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_COMPLETE_APPOINTMENT: '/doctor/complete-appointment',
  DOCTOR_CANCEL_APPOINTMENT: '/doctor/cancel-appointment',
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  DOCTOR_PROFILE: '/doctor/profile',
  DOCTOR_UPDATE_PROFILE: '/doctor/update-profile',
  
  // Admin endpoints
  ADMIN_LOGIN: '/admin/login',
  ADMIN_ADD_DOCTOR: '/admin/add-doctor',
  ADMIN_ALL_DOCTORS: '/admin/all-doctors',
  ADMIN_CHANGE_AVAILABILITY: '/admin/change-availability',
  ADMIN_APPOINTMENTS: '/admin/appointments',
  ADMIN_CANCEL_APPOINTMENT: '/admin/cancel-appointment',
  ADMIN_DASHBOARD: '/admin/dashboard',
};

