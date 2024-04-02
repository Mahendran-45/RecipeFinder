import React, { useState,useEffect } from 'react'
import '../css/Header.css'
import {  NavLink } from 'react-router-dom';


const Header = (props) => {
  let view;
    const[message,setMessage]=useState()
    const[messagestatus,setMessagestatus]=useState()
    const[showDbButton,setShowDbButton]=useState(true)
    const[addRecipeButton,setAddRecipeButton]=useState(false)
    const[favourite_list,setFavourite_list]=useState([])
    useEffect(() => {
        


        setTimeout(() => {
          setMessagestatus(false);
        }, 5000);
       
      }, [messagestatus]);

      useEffect(()=>{
        const data= window.localStorage.getItem('SHOW_BUTTON')
        console.log(data);
        const add_recipe=window.localStorage.getItem('ADD_BUTTON')
        if(data!=null){setShowDbButton(JSON.parse(data),setAddRecipeButton(JSON.parse(add_recipe)))}
 
 
       },[])
      useEffect(()=>{
        window.localStorage.setItem('SHOW_BUTTON',JSON.stringify(showDbButton))

        const data=window.localStorage.getItem('SHOW_BUTTON')
        if(JSON.parse(data)==false)
        {
          window.localStorage.setItem('ADD_BUTTON',JSON.stringify(true))

          setTimeout(()=>{

            setAddRecipeButton(true)

          },3000)

        }
        


        
      },[showDbButton])
      useEffect(()=>{
        const data= window.localStorage.getItem('Favourite_List')
        if(data!=null){setFavourite_list(prevState=>JSON.parse(data))}




      },[])

    

      

    const fetchDatabase=async()=>
    {
       await fetch('http://localhost:8000/api/addAllRecipes',{method:'POST',headers:{"content-Type":"text/html"}}).then((res)=>  res.text()).then((data)=>setMessage(data));
      //  document.querySelector('.populate_db_button').style.display="none";
       setMessagestatus(true);
       setShowDbButton(false)


    }
  return (
    <div className='header'>
    
        {showDbButton && (<button className='populate_db_button' onClick={()=>fetchDatabase()}>Populate DB</button>)}
        <div className='message'>{messagestatus&&message}</div>
        {addRecipeButton&&(
          <>
        <NavLink className="addRecipe_button" to="/">Search</NavLink>        
        <NavLink className="addRecipe_button" to="/addRecipe">Add Recipe</NavLink>
          
          </>
)}
        <NavLink className="addRecipe_button" to="/favouriteRecipe">Favourite Recipe</NavLink>

        

    </div>
  )
}

export default Header