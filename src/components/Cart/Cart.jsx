import React, { useContext, useState} from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItems from './CartItems'
import Checkout from './Checkout'

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const cartCtx = useContext(CartContext)
  const cartTotal = `Rs.${cartCtx.totalAmount.toFixed(2)}`
  const cartHasItems = cartCtx.items.length === 0
  const AddFromCartHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount:1
    })
  }
  const RemoveFromCartHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItems = <ul className={classes['cart-item']} style={{listStyle:'none'}}>{cartCtx.items.map((item)=>{
    return(
      <li key={item.id}>
      <CartItems 
        name={item.name} 
        price={item.price} 
        amount={item.amount} 
        onAddFromCartHandler={AddFromCartHandler.bind(null, item)}
        onRemoveFromCartHandler={RemoveFromCartHandler.bind(null, item.id)}
        />
      </li>
    )
  })}
  </ul>

  const onOrderClick = () => {
    setIsCheckout(!isCheckout)
    
  }

  const submitOrderHandler  = async (userData) => {
    const orders = {
      user_details: userData,
      order:{
        items: cartCtx.items,
        total_amount: cartCtx.totalAmount,
      }
    }
    setIsSubmitting(true)
    await fetch('https://food-delivery-feca9-default-rtdb.firebaseio.com/orders.json',
    {
      method: 'POST',
      body: JSON.stringify(orders),
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    setIsSubmitting(false)
    setIsSubmitted(true)  
    cartCtx.clearCart()
  }
  const cartOrderContent = <>
  { cartItems }
  { cartHasItems && <h3>Your Cart is empty</h3> }
  <div className={classes.total}>
    <span>Total Amount: </span>
    <span>{cartTotal}</span>
  </div>
  { isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={onOrderClick} /> }
  {
    !isCheckout && <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onToggleCart}>Close</button>
      {!cartHasItems && <button onClick={onOrderClick} className={classes.button}>Order</button>}
    </div>
  }
  </>

  const cartOrderSubmitting = <>
    <h3>Order Submission in process...</h3>

  </>
  const cartOrderSubmitted = <>
  <h3 style={{textAlign:'center'}}>Your order was successfully submitted. THANKYOU</h3>
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onToggleCart}>Close</button>
  </div>
</>

  return (
    <Modal onClick={props.onToggleCart}>
        {!isSubmitting && !isSubmitted && cartOrderContent}
        {isSubmitting && !isSubmitted && cartOrderSubmitting}
        {!isSubmitting && isSubmitted && cartOrderSubmitted}
    </Modal>
  )
}

export default Cart