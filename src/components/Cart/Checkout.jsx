import React, {useRef, useState} from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {
    const isEmpty = value => value.trim() === ''
    const isChar = (value,length1) => value.length === length1
    const [formvalidity, setFormValidity] = useState({
        name: true,
        address: true,
        postal: true,
        number: true
    })

    const nameInput = useRef()
    const addressInput = useRef()
    const postalInput = useRef()
    const numberInput = useRef()

    const onSubmitHandler = e => {
        e.preventDefault()
        const enteredName = nameInput.current.value
        const enteredAddress = addressInput.current.value
        const enteredPostal = postalInput.current.value
        const enteredNumber = numberInput.current.value

        const nameIsValid = !isEmpty(enteredName)
        const addressIsValid = !isEmpty(enteredAddress)
        const postalIsValid = isChar(enteredPostal, 6)
        const numberIsValid = isChar(enteredNumber,10)

        const formIsValid = nameIsValid && addressIsValid && postalIsValid && numberIsValid
        setFormValidity({
            name: nameIsValid,
            address: addressIsValid,
            postal: postalIsValid,
            number: numberIsValid 
        })
        if(formIsValid){
            
            props.onConfirm({
                name: enteredName,
                address: enteredAddress,
                postal: enteredPostal,
                number: enteredNumber
            })
            nameInput.current.value = ''
            addressInput.current.value = ''
            postalInput.current.value = ''
            numberInput.current.value = '' 
        }else{            
            return
        }
    }
   
    const nameClassInvalid = formvalidity.name ? classes.control : classes.invalid
    const addressClassInvalid = formvalidity.address ? classes.control : classes.invalid
    const postalClassInvalid = formvalidity.postal ? classes.control : classes.invalid
    const numberClassInvalid = formvalidity.number ? classes.control : classes.invalid
    return (
        <form onSubmit={onSubmitHandler}>
            <div className={nameClassInvalid}>
                <label>Name</label>
                <input ref={nameInput} type='text' id='name' />
            </div>
            {!formvalidity.name && <p className={classes.error}>Name field is empty</p>}
            <div className={addressClassInvalid}>
                <label>Address</label>
                <input ref={addressInput} type='text' id='address' />
            </div>
            {!formvalidity.address && <p className={classes.error}>Address field is empty</p>}
            <div className={postalClassInvalid}>
                <label>Postal Code</label>
                <input ref={postalInput} type='text' id='postal' />
            </div>
            {!formvalidity.postal && <p className={classes.error}>Postal code has to be 6 characters</p>}
            <div className={numberClassInvalid}>
                <label>Phone Number</label>
                <input ref={numberInput} type='text' id='number' />
            </div>
            {!formvalidity.number && <p className={classes.error}>Phone number has to be 10 characters</p>}
            <div className={classes.actions}>
                <button>Confirm Order</button>
                <button  onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default Checkout