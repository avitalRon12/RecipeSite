import { useContext, useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../App";
import LoginModal from "../../LoginModal";

function Home(props) {
  const { recipes, setRecipes, isModalOpen, setIsModalOpen } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);

  const navigate = useNavigate();

  async function apiFetch(newDiet, newIntolerances) {
    try {
      console.log(props.usedApiKey);
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          props.usedApiKey
        }&includeIngredients=${ingredients}${newDiet ? `&diet=${newDiet}` : ""}${
          newIntolerances ? `&intolerances=${newIntolerances}` : ""
        }&number=12&addRecipeInformation=true`
      );
      const data = response.data;
      console.log(data.results);
      setRecipes(data.results);
      localStorage.setItem('recipes', JSON.stringify(data.results));
      navigate("/RecipePage");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vegan, vegetarian, glutenFree, dairyFree);
    updateChoices()

  };

  function updateChoices() {
    let newDiet = "";
    let newIntolerances = "";

    const diets = [
      vegan ? "vegan" : "",
      vegetarian ? "vegetarian" : "",
      glutenFree ? "Gluten Free" : "",
    ];
    const intolerances = [dairyFree ? "Dairy Free" : ""];

    newDiet = diets.filter((d) => d).join(",");
    setDiet(newDiet);
    newIntolerances = intolerances.filter((i) => i).join(", ");
    setIntolerances(newIntolerances);
    apiFetch(newDiet, newIntolerances);
  }


  const toggleRecipes= (recipe)=> {
    let updatedRecipes = [...recipes];

    if (recipes.includes(recipe)) {
      updatedRecipes = updatedRecipes.filter(object => object!== recipe);
    } else {
      apiFetch()
    }
  }

  return (
    <div className="container">
      {/* <div>
        <img src="../images/logo 4.png" alt="" />
      </div> */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="searchBtn">
          <input
            type="text"
            placeholder="Search Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input type="submit" value="Search" />
        </div>
        <p className="pForm">
          Vegan
          <input
            type="checkbox"
            className="checkform"
            checked={vegan}
            onChange={(e) => setVegan(e.target.checked)}
          />
        </p> 
        <p className="pForm">
          Vegeterian
          <input
            type="checkbox"
            className="checkform"
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
          />
        </p>
        <p className="pForm">
          Gluten free
          <input
            type="checkbox"
            className="checkform"
            checked={glutenFree}
            onChange={(e) => setGlutenFree(e.target.checked)}
          />
        </p>
        <p className="pForm">
          Dairy Free
          <input
            type="checkbox"
            className="checkform"
            checked={dairyFree}
            onChange={(e) => setDairyFree(e.target.checked)}
          />
        </p>
      </form>
      <button onClick={() => setIsModalOpen(true)}>Login</button>
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Home;
