import classes from './CartItems.module.css'


const CartItems = props => {


    return (
        <div className={classes['cart-item']}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.summary}>
                    <span style={{ padding: '1rem' }}>{props.price}</span>
                    <span className={classes.amount}>x{props.amount}</span>
                </div>
            </div>
            
            <div className={classes.action}>
                <button onClick={props.onRemoveFromCartHandler}>-</button>
                <button onClick={props.onAddFromCartHandler}>+</button>
            </div>
        </div>
    )
}

export default CartItems