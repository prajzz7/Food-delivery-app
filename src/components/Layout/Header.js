import React from 'react'
import MealImg from '../../assets/meal_image3.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>World Delicacies</h1>
                <HeaderCartButton onClick={props.onToggleCart}/>
            </header>
            <div className={classes['main-img']}>
                <img src={MealImg} alt='A table with delicious Turkish food'></img>
            </div>
        </>
    )
}

export default Header