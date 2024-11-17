import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Adcarousel from '@components/dashboard/Adcarousel'
import { adData } from '@utils/dummyData'

const ContentContainer = () => {
    return (
        <View style={styles.container}>
            <Adcarousel adData={adData} />
        </View>
    )
}

export default ContentContainer

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 10,
    }
})