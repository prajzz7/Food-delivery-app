import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    if(action.type === 'ADD_CART'){
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount       
        const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        
        let updatedItems;
        if(existingCartItem){ 
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
            
        }
        else{
            updatedItems = state.items.concat(action.item)
        }  
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if(action.type === 'REMOVE_CART'){
        
        let updatedItems;        
        const existingCartItemIndex = state.items.findIndex((item)=>{
            return item.id === action.id
        })
        const existingCartItem = state.items[existingCartItemIndex]
        

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter((item)=> item.id !== action.id)
        }
        else{
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
        }
        const newTotalAmount = state.totalAmount - existingCartItem.price
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if(action.type === 'CLEAR_CART'){
        return action.defaultCart
            
    }
}

const CartProvider = props => {
    const defaultCart = {
        items:[],
        totalAmount: 0
    }
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_CART', item: item})
        
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART', id: id})
    }
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR_CART', defaultCart:defaultCart})
    }

    const cartContext={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider