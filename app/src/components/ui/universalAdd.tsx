import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { useCartStore } from '@state/cartStore';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const UniversalAdd: FC<{ item: any }> = ({ item }) => {
  const count = useCartStore((state) => state.getItemCount(item._id));
  const { addItem, removeItem } = useCartStore();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: count === 0 ? '#fff' : Colors.secondary },
      ]}
    >
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            variant="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}
          >
            ADD
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => removeItem(item._id)}>
            <Icon name="minus" color="#fff" size={RFValue(13)} />
          </Pressable>
          <CustomText
            variant="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.text}
          >
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)}>
            <Icon name="plus" color="#fff" size={RFValue(13)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 65,
    borderColor: Colors.secondary,
    borderRadius: 8,
  },
  add: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: Colors.secondary,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  text: {
    color: '#fff',
  },
});
