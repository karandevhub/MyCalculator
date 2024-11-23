import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '@components/ui/ScalePress';

const Adcarousel: FC<{ adData: any[] }> = ({ adData }) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.5,
  };
  return (
    <View style={{ left: -2, marginVertical: 20 }}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        autoPlay
        autoPlayInterval={3000}
        data={adData}
        height={180}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        renderItem={({ item }: any) => {
          return (
            <ScalePress style={styles.imagcontainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

export default Adcarousel;

const styles = StyleSheet.create({
  imagcontainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '95%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
