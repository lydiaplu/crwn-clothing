import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    let existingCartItem = false;

    const newCartItems = cartItems.map(
        (cartItem) => {
            if (cartItem.id === productToAdd.id) {
                existingCartItem = true;
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            } else {
                return cartItem
            }
        }
    )

    if (existingCartItem) {
        return newCartItems
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the current cart item
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // if the current cart item quality only one
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

// cart reducer
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return { ...state, ...payload }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

// cart context
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        }

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }

    // cart items opration
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }
    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}