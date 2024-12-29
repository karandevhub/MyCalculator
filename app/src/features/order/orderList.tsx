import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import OrderItem from './orderItem'

const OrderList = () => {
    const cartItems = useCartStore((state) => state.cart)
    const totalItems = cartItems?.reduce((acc, cartItems) => acc + cartItems?.count, 0)
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.img} />
                </View>
                <View>
                    <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Delivery in 9 minutes</CustomText>
                    <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={{ opacity: 0.8 }}>shipment of {totalItems || 0} item</CustomText>
                </View>
            </View>
            {
                cartItems.map((cartItem) => {
                    return (
                        <OrderItem key={cartItem?._id} item={cartItem} />
                    )
                })
            }
        </View>
    )
}

export default OrderList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 15
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15
    },
    img: {
        width: 30,
        height: 30
    }
})