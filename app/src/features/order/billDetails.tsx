import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'

const BillDetails: FC<{ totalItemsPrice: number }> = ({ totalItemsPrice }) => {
    return (
        <View style={styles.container}>
            <CustomText>Bill Details</CustomText>
            <View style={styles.billContainer}></View>
            <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
                <CustomText variant='h7' style={styles.text} fontFamily={Fonts.SemiBold}>
                    Grand Tottal
                </CustomText>
                <CustomText variant='h7' style={styles.text} fontFamily={Fonts.SemiBold}>
                    ₹{totalItemsPrice + 34}
                </CustomText>
            </View>
        </View>
    )
}

export default BillDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginVertical: 15
    },
    text: {
        marginHorizontal: 10,
        marginTop: 15
    },
    billContainer: {
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7,
    },
    flexRowBetween: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
})