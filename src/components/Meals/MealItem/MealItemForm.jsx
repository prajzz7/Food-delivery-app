import React, {  useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'


const MealItemForm = (props) => {
  const [amountError, setAmountError] = useState(false)
  const amountInputRef = useRef()
  const submitHandler = event => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if( enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setAmountError(true)
      return
    }
    props.onAddCartHandler(enteredAmountNumber)
    setAmountError(false)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input 
          ref={amountInputRef}
          label={'Amount'} 
          input={{
            id: 'amount',
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button>+ Add</button>
        {amountError && <p style={{color:'red'}}>Please enter a valid amount (1-5)</p>} 
    </form>
  )
}

export default MealItemForm