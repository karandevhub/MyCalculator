import { refresh_token } from '@service/authsService/authService';
import { BASE_URL } from '@service/authsService/config';
import { tokenStorsge } from '@state/storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add Authorization header if accessToken exists
appAxios.interceptors.request.use(async (config) => {
  const accessToken = tokenStorsge.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle errors
appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh token
        const newAccessToken = await refresh_token();

        if (newAccessToken) {
          // Update the original request's Authorization header
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request with the new token
          return appAxios(error.config);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        Alert.alert('Session expired', 'Please log in again.');
      }
    } else if (error.response) {
      // Handle other non-401 errors
      const errorMessage =
        error.response.data?.message || 'Something went wrong';
      Alert.alert(errorMessage);
    }

    // Reject the promise to propagate the error
    return Promise.reject(error);
  },
);
