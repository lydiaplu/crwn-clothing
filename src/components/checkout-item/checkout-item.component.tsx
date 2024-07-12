import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CartItem as TCartItem } from '../../store/cart/cart.type';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles';

type CheckoutItemProps = {
    cartItem: TCartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CheckoutItemContainer>
            {/* image */}
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            {/* name */}
            <BaseSpan>{name}</BaseSpan>
            {/* quantity */}
            <Quantity>
                <Arrow onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={() => dispatch(addItemToCart(cartItems, cartItem))}>&#10095;</Arrow>
            </Quantity>
            {/* price */}
            <BaseSpan>{price}</BaseSpan>
            {/* remove */}
            <RemoveButton onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;