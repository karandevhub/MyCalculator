import { StyleSheet, View, Animated as RNAnimated, Platform, StatusBar } from 'react-native';
import React, { FC } from 'react';
import { noticeheight } from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NOTICE_HEIGHT = noticeheight +12;

interface NoticeAnimationProps {
  noticePosition: RNAnimated.Value;
  children: React.ReactElement;
}

const NoticeAnimation: FC<NoticeAnimationProps> = ({
  noticePosition,
  children,
}) => {
  const translateY = noticePosition;

  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            transform: [
              {
                translateY: noticePosition.interpolate({
                  inputRange: [-NOTICE_HEIGHT, 0],
                  outputRange: [0, NOTICE_HEIGHT],
                }),
              },
            ],
          },
        ]}
      >
        {children}
      </RNAnimated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    top: 0,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
