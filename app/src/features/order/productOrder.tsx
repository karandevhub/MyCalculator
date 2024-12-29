import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors, Fonts } from '@utils/Constants'
import OrderList from './orderList'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import { useCartStore } from '@state/cartStore'
import BillDetails from './billDetails'

const ProductOrder: FC = () => {
    const { getTotalPrice, cart, clearCart } = useCartStore()
    const totalItemPrice = getTotalPrice()
    return (
        <View style={styles.container}>
            <CustomHeader title='Checkout' />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList />
                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/coupon.png')} style={{ width: 25, height: 25 }} />
                        <CustomText variant='h6' fontFamily={Fonts.SemiBold}>Use Coupons</CustomText>
                    </View>
                    <Icon name='chevron-right' size={RFValue(16)} color={Colors.text} />
                </View>
                <BillDetails totalItemsPrice={totalItemPrice} />
            </ScrollView>
        </View>
    )
}

export default ProductOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250
    },
    flexRowBetween: {
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 15,
        flexDirection: "row"
    },
    flexRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    }
})