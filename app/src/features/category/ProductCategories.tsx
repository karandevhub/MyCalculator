import {  StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'

const ProductCategories: FC = () => {

    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)



    return (

        <View style={styles.mainConatiner}>
            <CustomHeader title={selectedCategory?.name || "Categories"} search={true}/>

        </View>
    )
}

export default ProductCategories

const styles = StyleSheet.create({
    mainConatiner: {
        flex: 1,
        backgroundColor: "white",
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})