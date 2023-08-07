import React, { useContext } from "react";
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext)
    const numberOfCartItems  = cartCtx.items.reduce((currNumber, item)=>{
        return currNumber + item.amount;
    }, 0)

    return (
        <button className={classes.buttonClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span className={classes.text}>Cart</span>
            <span className={classes.totalCartItems}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton