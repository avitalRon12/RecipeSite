import React from "react";
import { useEffect, useState } from "react";
import { RecipeContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { recipes, favorites, toggleFavorite } = useContext(RecipeContext);

  return (
    <div>
      <h1>Favorite List</h1>
      {favorites.length === 0 ? (
        <p>You have no favorites</p>
      ) : (
        <ul className="ulRecipes">
          {favorites.map((recipe, index) => (
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
              <button onClick={() => toggleFavorite(recipe)}>Remove</button>
              {recipe.veryPopular && <p>⭐Very Popular⭐</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
