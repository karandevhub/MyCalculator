// ProductDashboard.tsx
import {
  Animated as RNAnimated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '@state/authStore';
import NoticeAnimation from '../../components/dashboard/NoticeAnimation';
import { noticeheight } from '@utils/Scaling';
import Visuals from '../../components/dashboard/Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from '@components/dashboard/AnimatedHeader';
import StickySeachBar from '@components/dashboard/StickySeachBar';
import ContentContainer from './ContentContainer';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';

const ProductDashboard = () => {
  const { user } = useAuthStore();
  const NOTICE_HEIGHT = noticeheight + 20;
  const noticePosition = useRef(new RNAnimated.Value(-NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: -NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <View style={styles.contentContainer}>
        <Visuals />
        <CollapsibleContainer style={styles.collapsibleContainer}>
          <CollapsibleHeaderContainer containerStyle={{ backgroundColor: "transparent" }}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 2500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySeachBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <ContentContainer />
            <View style={{ backgroundColor: "#F8F8F8", padding: 20 }}>
              <CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
                India's last minute app 🥭
              </CustomText>
              <CustomText fontFamily={Fonts.Bold} style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}>
                Developed By ❤️ Karan
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </View>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  collapsibleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  textContainer: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default withCollapsibleContext(ProductDashboard);
