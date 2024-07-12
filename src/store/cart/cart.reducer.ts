import { AnyAction } from "redux";
import { CART_ACTION_TYPES } from "./cart.type";
import { CartItem } from "./cart.type";

/** init state */
export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {

    switch (action.type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: action.payload
            }
        default:
            return state;
    }
}