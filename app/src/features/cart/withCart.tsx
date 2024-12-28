import React, { FC, memo } from 'react';
import { useCartStore } from '@state/cartStore';
import { StyleSheet, View } from 'react-native';
import CartAnimationWrapper from './cartAnimationWrapper';
import CartSummary from './cartSummary';

const withCart = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithCartComponent: FC<P> = (props) => {
    const cart = useCartStore((state) => state.cart);
    const cartCount = React.useMemo(
      () => cart.reduce((acc, item) => acc + item.count, 0),
      [cart],
    );

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <CartAnimationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </CartAnimationWrapper>
      </View>
    );
  };

  return memo(WithCartComponent); // Memoize the HOC to avoid unnecessary re-renders.
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withCart;
