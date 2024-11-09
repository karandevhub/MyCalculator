import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuthStore } from '@state/authStore';

const ProductDasboard = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <View>
      <Text>ProductDasboard</Text>
    </View>
  );
};

export default ProductDasboard;

const styles = StyleSheet.create({});
