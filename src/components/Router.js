import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './Search'
import AddRecipe from './AddRecipe'
import Success from './Success'
import FavouriteRecpie from './FavouriteRecipe'


const Router = (props) => {
  const getFavourites=(value)=>{
    console.log("from router"+value)
    props.getFavourites(value)

  }
  return (
    <>
    <Routes>
    <Route path="/" element={<Search getFavourites={getFavourites}/>}></Route>
    
        <Route path="/addRecipe" element={<AddRecipe/>}></Route>
        <Route path="/addRecipe/success" element={<Success/>}></Route>
        <Route path="/favouriteRecipe" element={<FavouriteRecpie/>}></Route>

            
    

        
    </Routes>
    
    
    </>
  )
}

export default Router