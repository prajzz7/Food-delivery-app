import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header'
import MealsSummary from './components/Meals/MealsSummary';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

function App() {
  const [cartShown, setCartShown] = useState(false)

  const toggleCart = () => {
     setCartShown(!cartShown)
  }

  return (
    <CartProvider>
      {cartShown && <Cart onToggleCart={toggleCart}/>}
      <Header onToggleCart={toggleCart}/>
      <MealsSummary/>
      <Meals/>  
    </CartProvider>
  );
}

export default App;
