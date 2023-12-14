import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { RecipeContext } from "../../App";
import  "./RecipePage.css";
import { useLocation, Link } from "react-router-dom";

const RecipePage = () => {
  const { recipes, setRecipes, favorites, toggleFavorite } =
    useContext(RecipeContext);

  const makeClassName = (recipeId) => {
    return favorites.includes(recipeId)
      ? "btn-removefromfavorite"
      : "btn-addtofavorite";
  };

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  return (
    <div>
      <h1>Recipe Results</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul className="ulRecipes">
          {recipes.map((recipe, index) => (
            <li key={index}>
              <Link to={`/recipePage/${recipe.id}`}>
                <div className="recipeTitleDiv">{recipe.title}</div>
                <div className="recipeImgDiv">
                  <img src={recipe.image} alt="" />
                </div>
              </Link>
              <div className="pContainer">
              <p>Health Score: {recipe.healthScore}</p>
              <p>Preperation Time: {recipe.readyInMinutes} minutes</p>
              <p>Total Servings: {recipe.servings}</p>
              <button onClick={() => toggleFavorite(recipe)}>
                {favorites.some((favRecipe) => favRecipe.id === recipe.id)
                  ? "Unfavorite"
                  : "Add to Favorites"}
              </button>
              {recipe.veryPopular && <p>⭐Very Popular⭐ </p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default RecipePage;
