import { View, Alert, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { DeliveryLoginApi } from '@service/authsService/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { screenHeight } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import IconEmail from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPassword from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
import { resetAndNavigate } from '@utils/NavigationUtils';
const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async() => {
    setLoading(true);
    try {
    await DeliveryLoginApi(email, password);
    resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.container}>
            <View style={styles.lottieContainer}>
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require('@assets/animations/delivery_man.json')}
              />
            </View>
            <CustomText fontFamily={Fonts.Bold} variant="h3">
              Delivery Partner Portal
            </CustomText>
            <CustomText fontFamily={Fonts.SemiBold} variant="h6">
              Faster than Flash
            </CustomText>

            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={
                <IconEmail
                  name="email"
                  color={'#F8890E'}
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder="Email"
              inputMode="email"
              right={false}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={
                <IconPassword
                  name="key-sharp"
                  color={'#F8890E'}
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder="Password"
              secureTextEntry
              right={false}
            />
            <CustomButton
              onPress={handleLogin}
              title='Login'
              loading={loading}
              disabled={email.length === 0 || password.length === 0}
            />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </CustomSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
