import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { noticeheight } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import Svg, { Defs, G, Path, Use } from 'react-native-svg';
import { wavyData } from '@utils/dummyData';
const Notice = () => {
  return (
    <View style={{ height: noticeheight }}>
      <View style={styles.container}>
        <View style={styles.noticeConatiner}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}
            >
              Its's raining near this location
            </CustomText>
            <CustomText style={styles.textCenter}>
              Our deliver partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.svg}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="220" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#CCD5E4',
  },
  noticeConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    color: '#2D3875',
    marginBottom: 8,
    textAlign: 'center',
  },
  svg: {
    width: '100%',
    transform: [{ rotate: '180deg' }],
  },
});
