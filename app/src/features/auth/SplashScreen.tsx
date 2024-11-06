import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';

const SplashScreen: FC = () => {
    return (
        <View style={styles.container}>
  
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenHeight * 0.7,
        resizeMode: 'contain',
    }
});
