// ProductDashboard.tsx
import {
  Platform,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { useAuthStore } from '@state/authStore';
import NoticeAnimation from '../../components/dashboard/NoticeAnimation';
import { noticeheight, screenHeight } from '@utils/Scaling';
import Visuals from '../../components/dashboard/Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from '@components/dashboard/AnimatedHeader';
import StickySeachBar from '@components/dashboard/StickySeachBar';
import ContentContainer from './ContentContainer';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ProductDashboard: FC = () => {
  const { user } = useAuthStore();
  const NOTICE_HEIGHT = noticeheight + 20;
  const noticePosition = useRef(new RNAnimated.Value(-NOTICE_HEIGHT)).current;
  const { scrollY, expand } = useCollapsibleContext();

  console.log(scrollY.value)
  const previousScroll = useRef<number>(0);
  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });
    previousScroll.current = scrollY.value;
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

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
        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <Icon
              name="arrow-up-circle-outline"
              color={'white'}
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{ color: 'white' }}
              fontFamily={Fonts.SemiBold}
            >
              Back to Top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.collapsibleContainer}>
          <CollapsibleHeaderContainer
            containerStyle={{ backgroundColor: 'transparent' }}
          >
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
            onScroll={(e) => {
              console.log('Scroll event:', e.nativeEvent.contentOffset.y);
            }}
          >
            <ContentContainer />
            <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.2 }}
              >
                India's last minute app 🥭
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
              >
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
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);
