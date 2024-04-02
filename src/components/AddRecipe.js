import React, { useEffect, useState } from "react";
import "../css/AddRecipe.css";
import { useNavigate } from "react-router-dom";




const AddRecipe = () => {
  const navigate = useNavigate();

    const[item,setItem]=useState("");
    const [recipes,setRecipes]=useState([])
    const[suggestions,setSuggestions]=useState([])
    const [addedRecipeArray,setAddedRecipeArray]=useState([])
    const[ingredientArray,setIngredientArray]=useState([])
  let addedRecipe = [{ quantity: "1", ingredients: "sugar" }];
  async function fetchData(){
    await fetch('http://localhost:8000/fetchAllRecipe').then((data)=> {return data.json()}).then((data)=>setRecipes(data)).then(()=>{
      console.log(recipes)
    })
  }
  useEffect( ()=>{
    fetchData()


  }
  ,[])
  let recipe_suggested=[];
  const changeIngredient=(e,suggestion)=>{
    setItem(suggestion);
    document.querySelector('.suggestions').style.display="none"


  }

  const addRecipeUi=(e)=>{
    const ingredient_array=[]

    e.preventDefault()
    const quantity=document.querySelector('#quantity').value;
    const ingredients=document.querySelector('#ingredient').value;
    const newRecipe={"quantity":quantity,"ingredients":ingredients}
    const val=""+quantity+" "+ingredients;

    ingredient_array.push(val);
    console.log(ingredient_array);

    setIngredientArray([...ingredientArray,val])
    console.log("Array for Ingredient"+ingredient_array)

    addedRecipe.push(newRecipe);
    setAddedRecipeArray([...addedRecipeArray,newRecipe])
    console.log("new recipe added"+addedRecipe)
    document.querySelector('#quantity').value="";
    setItem("")

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(e)
    console.log(e.target.name.value)
    const name=e.target.name.value;
    const description=e.target.description.value;
    const ingredients=e.target.ingredient.value
    console.log("ingredients"+ingredients)
      const new_recipe={"name":name,"description":description,"ingredients":ingredientArray,"image":"none","cookTime":"","prepTime":"","recipeYield":"N/A"}

      console.log("new Recipe going to be added"+JSON.stringify(new_recipe))

      await fetch('http://localhost:8000/api/addRecipe',{method:'POST',headers:{"content-Type":"application/json"},body:JSON.stringify(new_recipe)}).then((res)=>  res.json()).then((data)=>console.log("data is"+data)).then(()=>navigate("success")).catch((err)=>console.log(err));




  }

  const addIngredient=(e)=>{

    e.preventDefault();
    document.querySelector('.suggestions').style.display="block"

    const value=e.target.value;
    setItem((prevState)=>e.target.value
    )
    recipes.map((recipe)=>{
        recipe.ingredients.filter((ingredient)=>
      {
        if(ingredient.toLowerCase().includes(value.toLowerCase())){

         let splitedArray= ingredient.split(' ')
         splitedArray.map((singlearray)=>{
          // console.log(singlearray);
          console.log("item length"+item.length)
          console.log("slice "+ singlearray.slice(0,value.length))
         if(value&& singlearray.slice(0,value.length).toLowerCase()===(value.toLowerCase()))
         {
          // console.log(item)
          // console.log(singlearray)
         return  recipe_suggested.push(singlearray)
         }
         }
         
         )


  
          return recipe
  
        }
       
      }
      )
       console.log(recipe_suggested);
       recipe_suggested=recipe_suggested.filter((item,index,inputArray)=>inputArray.indexOf(item)===index)
       console.log(recipe_suggested);
       setSuggestions(recipe_suggested)



    }



    
    )
    // console.log(ba);

    // console.log(results);

   
    



  }
  return (
    <div class="add-recipe">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", margin: "0px auto,widt:100%" ,color:"blue"}}>
          Add Recipe
        </h1>
        <div className="input_field">
          <label className="name" for="name">
            Name
          </label>
          <input type="text" id="name"></input>
        </div>
        <div className="input_field" id="description_div">
          <label className="description" for="description">
            Description
          </label>
          <textarea id="description"></textarea>
        </div>
        <div className="added_recipe">
          <ul className="ul_added_recipe">
            <li className="li_added_recipe">
              <div>Quantity</div>
              <div>Ingredients</div>
            </li>
            {addedRecipeArray && addedRecipeArray.map((ingredient_item) => {
              return (
                <li className="li_added_recipe">
                  <div className="quantity">{ingredient_item.quantity}</div>
                  <div className="ingredient">
                    {ingredient_item.ingredients}
                  </div>
                </li>
              );
            })}
          </ul>
          <h3 style={{ textAlign: "center", margin: "0px auto,widt:100%" }}>
            Add Ingredients
          </h3>
          <div className="input_field">
            <label className="quantity" for="quantity">
              Quantity
            </label>
            <input type="text" id="quantity"></input>
          </div>
          <div className="input_field">
            <label className="ingredient" for="ingredient">
              Ingredient
            </label>
            <input type="text" id="ingredient"  value={item} onChange={(e)=>addIngredient(e)}></input>
          </div>
         
         
         
        </div>
        <div className="suggestions">
          {
            suggestions.map((suggestion)=><p onClick={(e)=>{changeIngredient(e,suggestion)}}>{suggestion}</p>)
          }
          </div>
          <button className="add_ingredient" onClick={(e)=>{addRecipeUi(e)}}>Add Ingredient</button>
          <div>
          <button type="submit" className="add_recipe">Save Recipe</button>

          </div>

         
      </form>
    </div>
  );
};

export default AddRecipe;
