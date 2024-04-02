import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

const FavouriteRecipe = (props) => {
    const[favourite_list,setFavourite_list]=useState([])

    useEffect(()=>{
        const data= window.localStorage.getItem('Favourite_List')
        if(data!=null){setFavourite_list(prevState=>JSON.parse(data))}




      },[])

      const changeFormat = (recipe) => {
        // console.log(recipe)
        let duration = recipe === "" ? "PT0M" : recipe;
        let string = duration;
    
        let array = string.match(/(\d+)(?=[MHS])/gi) || [];
        // console.log("Array " + array);
    
        let formatted = array
          .map(function (item) {
            if (item.length < 2 && array.length > 1) return "0" + item;
            if (item.length < 2 && array.length <= 1) return "00:0" + item;
            if (item.length <= 2 && array.length <= 1) return "00:" + item;
            // console.log(recipe);
            return item;
          })
          .join(":");
        // console.log(formatted);
        formatted = formatted == "00:00" ? "N/A" : formatted;
        return formatted;
      };
      const viewRecipeFunc=(e,recipe)=>{
        e.preventDefault();
        props.reciepe_data(e,recipe,true);
     
      }
      const addFavourite=(e,recipe,index)=>{
        e.preventDefault();
        console.log("click detail"+e.detail)
        recipe={...recipe,"indexVal":index}
        if(favourite_list &&  !favourite_list.find(item=>item.indexVal==index))
        {
          favourite_list.push(recipe);
          document.querySelector(`.favourite_${index}`).style.color="#e517a4"
        console.log(favourite_list);
        // setFavouriteItem(prevstate => ([...prevstate,recipe]))
        // setFavouriteItem(prevState => [...favourite_list],favourite_list)
    
    
    
        }
        else if(favourite_list && favourite_list.find(item=>item.indexVal==index) ){
          console.log(favourite_list)
          console.log(favourite_list.find(item => item.indexVal))
          console.log("index"+index);
          favourite_list=favourite_list.filter((obj)=>obj.indexVal!==index)
          document.querySelector(`.favourite_${index}`).style.color="black"
        console.log(favourite_list);
        // setFavouriteItem(favourite_list)
    
    
        }
        props.getFavourites(favourite_list)
    
        window.localStorage.setItem('Favourite_List',JSON.stringify(favourite_list))
    
    
        
    
    
    
    
    
      }
    
    
  return (
    <div>
         <ul className="recipes-results">
      {
        favourite_list.map((recipe,index) => (
          <li className="recipe-card">
            <img src={recipe.image} onError={(e)=>e.target.src="/silehoutee.jpeg"} ></img>
   
            <h1>{recipe.name}</h1>

            <p>
              <strong>CookTime:</strong>
              {changeFormat(recipe.cookTime)}
            </p>
            <p>
              <strong>PrepTime:</strong>
              {changeFormat(recipe.prepTime)}
            </p>
            <p>
              <strong>Yield:</strong>
              {recipe.recipeYield}
            </p>
            <div className="flex-buttons">
            <button onClick={(e)=>viewRecipeFunc(e,recipe)}>
                <span>
                  <FontAwesomeIcon icon={faEye} />
                </span>

                <span> View Recipe</span>
                
              </button>
              <button onClick={(e)=>addFavourite(e,recipe,index)}>
                <span className={`favourite_${index}`}>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span> Add to Favourites</span>
              </button>
            </div>
          </li>
        ))}
    </ul>



    </div>
  )
}

export default FavouriteRecipe