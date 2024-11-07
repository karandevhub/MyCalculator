import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { imageData } from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenHeight, screenWidth } from '@utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  console.log(rows);
  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={10000}
      >
        <View style={styles.gridCotainer}>
          {rows?.map((row, index) => {
            return <MemoizeRow key={index} row={row} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row.map((image, imageIndex) => {
        const horizontalshift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalshift }] },
            ]}
            key={imageIndex}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizeRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: '#e9f7f8',
    borderRadius: 25,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridCotainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ProductSlider;
