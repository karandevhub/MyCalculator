import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Adcarousel from '@components/dashboard/Adcarousel';
import { adData, categories } from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const ContentContainer = () => {
  return (
    <View style={styles.container}>
      <Adcarousel adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Bestsellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home & Lifestyles
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default ContentContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
