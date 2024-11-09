import {
  View,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { CustomerLoginApi } from '@service/authsService/authService';
const bottomColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  console.log(keyboardOffsetHeight);
  const animatedValue = useRef(new Animated.Value(0)).current; // will use later

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight, animatedValue]);

  const handleGesture = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      console.log(newSequence);
      if (newSequence.join(' ') === 'down down right left up') {
        resetAndNavigate('DeliveryLogin');
        setGestureSequence([]);
      }
    }
  };

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await CustomerLoginApi(phoneNumber);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/logo.png')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  India's last minute app
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}
                >
                  Log in or Sign up
                </CustomText>
                <CustomInput
                  style={{ letterSpacing: 2 }}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  left={
                    <CustomText
                      variant="h6"
                      fontFamily={Fonts.SemiBold}
                      style={styles.phoneNumber}
                    >
                      +91
                    </CustomText>
                  }
                  inputMode="numeric"
                />
                <CustomButton
                  disabled={phoneNumber.length != 10}
                  loading={loading}
                  title="Continue"
                  onPress={() => handleAuth()}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(6)}>
              By Continuing, you are agreeing to our Terms of Service & Privacy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneNumber: {
    marginLeft: 10,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    borderWidth: 0.8,
    borderColor: Colors.border,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
});

export default CustomerLogin;
