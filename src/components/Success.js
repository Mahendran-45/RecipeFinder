import React, { useEffect } from 'react'
import { useState } from 'react'
import '../css/Success.css'

const Success = () => {
  const[countValue,setCountValue]=useState([])

   async  function  fetchRecipeCount(){
         await fetch('http://localhost:8000/api/fetchRecipesCount',{method:'GET',headers:{"content-Type":"text/html"}}).then((res)=>{return res.text()}).then((data)=>setCountValue(data))

    }
    useEffect( ()=>{
      fetchRecipeCount()
  
  
    }
    )
  return (
    <div className='success'><h2>Recipe Added SuccessFully</h2>
    <p className='success-p'>{`Total Recipes in DataBase is ${countValue}`}</p>
    
    
    </div>
  )
}

export default Success