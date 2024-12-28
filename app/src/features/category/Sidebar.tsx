import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';

interface SideBarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SideBarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;
    categories?.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) {
        targetIndex = index;
      }
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {
        duration: 500,
      });
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));

  return (
    <GestureHandlerRootView style={{ width: '24%' }}>
      <View style={styles.sideBar}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View>
            {categories?.map((category: any, index: number) => {
              const animatedStyle = useAnimatedStyle(() => ({
                bottom: animatedValues[index].value,
              }));
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.selectedCategoryButton,
                  ]}
                  onPress={() => onCategoryPress(category)}
                >
                  <View
                    style={[
                      styles.imageContainer,
                      selectedCategory?._id === category?._id &&
                        styles.selectedImageContainer,
                    ]}
                  >
                    <Animated.Image
                      source={{ uri: category.image }}
                      style={[styles.image, animatedStyle]}
                    />
                  </View>
                  <CustomText
                    fontSize={RFValue(7)}
                    style={{ textAlign: 'center' }}
                  >
                    {category?.name}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </ScrollView>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sideBar: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  selectedCategoryButton: {
    backgroundColor: '#F3F4F7',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageContainer: {
    borderRadius: 100,
    height: '50%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F7',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  selectedImageContainer: {
    backgroundColor: '#CFFDB',
  },
  indicatorInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CFFDB',
  },
});
