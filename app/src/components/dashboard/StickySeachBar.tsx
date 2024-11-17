import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import { Colors } from '@utils/Constants';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,

} from 'react-native-reanimated';
import Searchbar from './Searchbar';


const StickySearchBar = () => {
  const { scrollY } = useCollapsibleContext();

  const animatedShadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 140],
      [0, 1],

    );

    return {
      opacity: withTiming(opacity, { duration: 150 }) // Smooth transition
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 80],
      [0, 1],
    );

    return {
      backgroundColor: `rgba(255,255,255,${withTiming(opacity, { duration: 150 })})`
    };
  });

  return (
    <StickyView style={[styles.container, animatedBackgroundStyle]}>
      <Searchbar />
      <Animated.View
        style={[
          styles.shadow,
          animatedShadowStyle
        ]}
      />
    </StickyView>
  );
};

export default StickySearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 100,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchText: {
    color: '#666',
    fontSize: 16,
  },
  shadow: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: 'transparent',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  }
});