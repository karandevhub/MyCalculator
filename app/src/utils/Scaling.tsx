import { Dimensions, Platform, StatusBar } from 'react-native';

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;

const DEFAULT_ANDROID_STATUS_BAR_HEIGHT = 0;

export const statusBarHeight: number = Platform.OS === 'android'
  ? StatusBar.currentHeight ?? DEFAULT_ANDROID_STATUS_BAR_HEIGHT
  : 0;

export const noticeheight: number = Platform.OS === 'android'
  ? screenHeight * 0.07 + statusBarHeight
  : screenHeight * 0.12;