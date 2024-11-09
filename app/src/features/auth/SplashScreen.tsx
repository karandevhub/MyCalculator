import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import { jwtDecode } from 'jwt-decode';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Logo from '@/assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorsge } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { refetchUser, refresh_token } from '@service/authsService/authService';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const tokenCheck = () => {
    const accessToken = tokenStorsge.getString('accessToken') as string;
    const refreshToken = tokenStorsge.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session expired', 'Please login again');
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_token();
          refetchUser(setUser);
        } catch (error) {
          console.error(error);
          Alert.alert('there was an error refreshing token');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('DeliveryLogin');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }

      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const fetchUserLoaction = () => {
      try {
        Geolocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry we need location service to give you better shopping experience',
        );
      }
    };
    const timeoutId = setTimeout(fetchUserLoaction, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
