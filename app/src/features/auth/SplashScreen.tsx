import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Logo from '@/assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorsge } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const tokenCheck = () => {
    const accessToken = tokenStorsge.getString('accessToken') as string;
    const refreshToken = tokenStorsge.getString('refreshToken') as string;

    if (accessToken) {
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
