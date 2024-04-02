import React, {  useState } from 'react'
import '../css/Search.css';
import SearchResults from './SearchResults';
import RecipeCard from "./RecipeCard";




const Search = (props) => {
    const[filter,setFilter]=useState();
    const[showresult,setShowResult]=useState(false)
    const[recipesresult,setRecipesresult]=useState([])
    const[searchResult,setSearchResult]=useState(true)
    const[fullViewRecipe,setFullViewRecipe]=useState();
    const[viewRecipeStatus,setViewRecipeStatus]=useState(false)


    const searchBox=(event)=>{
  
        if(event.key === 'Enter'){
          
            filterRecipe();
          }
          
    }
    const getFavourites=(value)=>{
        console.log("from search"+value)
        props.getFavourites(value)

    }
    const filterRecipe=()=>{
        try{
            fetch(`http://localhost:8000/findRecipe?recipe=${filter}`).then((res)=>{return res.json()}).then((data)=>setRecipesresult(data),setShowResult(true),setViewRecipeStatus(false))

        }
        catch{

        }
    }
    const reciepe_data=(e,data,status)=>{
        e.preventDefault()
        console.log("from child to parent"+data)
        setFullViewRecipe(data)
        setViewRecipeStatus(true);
        setShowResult(false)


    }
  

  return (
    <div className='main_search'>
        <div class='logo'>
        <img src={'/logo3.png'}></img>


        </div>
        <div className='search-box'>
        <i class="fa fa-search"></i>

            <input type="text"  onChange={(e)=>setFilter(e.target.value)}   onKeyDown={(e)=>searchBox(e)} placeholder='Find Recipe'></input>


        </div>
        {showresult&&<SearchResults recipes={recipesresult} status={setSearchResult} reciepe_data={reciepe_data} getFavourites={getFavourites}/>}
        <div>{viewRecipeStatus&&<RecipeCard recipe={fullViewRecipe}/>}</div>

    </div>
  )
}

export default Search