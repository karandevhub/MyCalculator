import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { user, setUser } = useAuthStore();
  console.log(user);
  return (
    <View style={styles.subConatiner}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}
          >
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontFamily={Fonts.SemiBold}
              variant="h9"
              style={{
                color: '#3B4886',
              }}
            >
              🌧️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText variant="h8" numberOfLines={1} fontFamily={Fonts.Bold} style={styles.text}>
            {user?.address || 'Knowhere, Somewhere 😊'}
          </CustomText>
          <Icon
            name="menu-down"
            color="#fff"
            style={{ bottom: -1 }}
            size={RFValue(20)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="account-circle-outline" color="#fff" size={RFValue(36)} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  subConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 5,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  text2: {
    color: 'fff',
    width: '90%',
    textAlign: 'center',
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '70%',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: '#EBEAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
