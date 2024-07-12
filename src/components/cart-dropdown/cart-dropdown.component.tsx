import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems } from '../../store/cart/cart.selector';

import CartItem from '../cart-item/cart-item.component';
import Button from "../button/button.component";

import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";

const CartDowndown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length > 0 ? (
                    cartItems.map((cartItem) =>
                        <CartItem key={cartItem.id} cartItem={cartItem} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDowndown;