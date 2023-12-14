import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../../App";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const { favorites, toggleFavorite } = useContext(RecipeContext);
  const { recipeId: rawRecipeId } = useParams();
  const recipeId = Number(rawRecipeId);

  useEffect(() => {
    // Fetch the recipe details using the recipeId from the URL
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${props.usedApiKey}`
        );
        console.log(response.data);
        setRecipeDetail(response.data);
      } catch (error) {
        alert(`Error ${error}`);
      }
    };

    fetchRecipeDetail();
  }, [recipeId]);

  const toggleInstructionsModal = () => {
    setShowInstructionsModal(!showInstructionsModal);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const InstructionsModal = ({ instructions, onClose }) => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <h3>Instructions</h3>
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>
              <p>{instruction.step}</p>
            </li>
          ))}
        </ol>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  const IngredientsModal = ({ ingredients, onClose }) => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>{ingredient.original}</p>
              </li>
            ))}
          </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  if (!recipeDetail) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="container2">
      <h1>{recipeDetail.title}</h1>
      {recipeDetail.description}
      <img src={recipeDetail.image} alt="recipe img" />
      <br />
      <button onClick={toggleModal}>Ingridents</button>
      {showModal && (
        <IngredientsModal
          ingredients={recipeDetail.extendedIngredients}
          onClose={toggleModal}
        />
      )}
      <button onClick={toggleInstructionsModal}>Instructions</button>
      {showInstructionsModal && (
        <InstructionsModal
          instructions={recipeDetail.analyzedInstructions[0].steps}
          onClose={toggleInstructionsModal}
        />
      )}
      <button onClick={() => toggleFavorite(recipeId)}>
        {favorites.includes(recipeId) ? "Unfavorite" : "Add to Favorites"}
      </button>
      </div>
    </div>
  );
};
export default RecipeDetail;
