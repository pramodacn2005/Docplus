import { Alert } from 'react-native';
import { API_BASE_URL } from '../config/api';

/**
 * Check if backend server is reachable
 */
export const checkBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/`, {
      method: 'GET',
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    console.error('Backend connection check failed:', error);
    return false;
  }
};

/**
 * Show network error alert with helpful instructions
 */
export const showNetworkError = () => {
  Alert.alert(
    'Connection Error',
    `Cannot connect to backend server at:\n${API_BASE_URL}\n\nPlease check:\n\n1. Backend server is running\n2. Update IP address in src/config/api.js\n3. Phone and computer on same WiFi\n4. Firewall allows port 4000`,
    [{ text: 'OK' }]
  );
};

/**
 * Get current API base URL (for debugging)
 */
export const getCurrentAPIUrl = () => {
  return API_BASE_URL;
};

