import React, { useEffect } from "react";
import "../css/RecipeCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe }) => {
    useEffect(()=>{
        window.scrollTo(0, 0);

    },[])
  console.log(recipe);
  const changeFormat = (recipe) => {
    // console.log(recipe)
    let duration = recipe === "" ? "PT0M" : recipe;
    let string = duration;

    let array = string.match(/(\d+)(?=[MHS])/gi) || [];
    console.log("Array " + array);

    let formatted = array
      .map(function (item) {
        if (item.length < 2 && array.length > 1) return "0" + item;
        if (item.length < 2 && array.length <= 1) return "00:0" + item;
        if (item.length <= 2 && array.length <= 1) return "00:" + item;
        console.log(recipe);
        return item;
      })
      .join(":");
    console.log(formatted);
    formatted = formatted == "00:00" ? "N/A" : formatted;
    return formatted;
  };
  return (
    <div className="recipe_card_view">
      <img
        src={recipe.image}
        onError={(e) => (e.target.src = "/silehoutee.jpeg")}
      ></img>
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
      <p>{recipe.description}</p>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <ul>
            {
                recipe.ingredients.map((ingredient)=>(
                    <li>{ingredient}</li>
                ))
            }
        </ul>
      </div>
      <button>
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span> Add to Favourites</span>
              </button>
    </div>
  );
};

export default RecipeCard;
