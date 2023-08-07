import React, { useContext, useEffect } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'


const  MealItem = props => {
  const price = `Rs.${props.price}`
  const cartCtx = useContext(CartContext)
  const addCartHandler = (totalItemsNo) => {
      
    cartCtx.addItem({
        id: props.id,
        name: props.name,
        price: props.price,
        amount: totalItemsNo
    }) 
  }
  return (
      <div className={classes['item-row']}>
        <div className={classes.Item}>
            <h3 className={classes.name}>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddCartHandler={addCartHandler}/>
        </div>
      </div>
    
  )
}

export default MealItem