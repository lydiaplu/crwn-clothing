import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDowndown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = ()=> dispatch(signOutStart());

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    return (
        <>
            <NavigationContainer>
                {/* left part -- the logo */}
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>

                {/* right part -- nav link */}
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDowndown />}
            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation;