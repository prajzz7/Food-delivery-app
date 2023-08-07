import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";


  const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [errorFetchingData, setErrorFetchingData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
      const fetchMeals = async () => {  
        try{          
          const response = await fetch('https://food-delivery-feca9-default-rtdb.firebaseio.com/meals.json')
          if(!response.ok){
            throw new Error('Something went wrong.....')   
          }
          const data = await response.json()
          
            setIsLoading(false)
          
          let transformed_meals_Object = [];
          for (const key in data) {
            transformed_meals_Object.push({
              id: key,
              name: data[key].name,
              description: data[key].description,
              price: data[key].price
          })
        }
          setMeals(transformed_meals_Object)
        }
        catch(error){
          setIsLoading(false)
          console.log(error)
          setErrorFetchingData(error.message)
        }     
      }
      fetchMeals()
    },[])
    
    const mealsList = meals.map((meal)=>(
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))
    return (
        <section className={classes.meals}>
          <Card>
            <ul>
              {!isLoading && mealsList}
              {/* {isLoading && <p style={{textAlign:'center'}}>Fetching data.... Please Wait</p>} */}
              {errorFetchingData && <h3 className={classes['error-fetch']}>Something went wrong..... Failed to load Menu... </h3> }
            </ul>
          </Card>
        
        </section>
    )
  }

  export default AvailableMeals