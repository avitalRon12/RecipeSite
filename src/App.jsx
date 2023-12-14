import { React, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import RecipePage from "./pages/RecipePage/RecipePage";
import Favorites from "./pages/Favorites/Favorites";
import Layout from "./components/Layout/Layout";
import RecipeDetail from "./pages/SingleRecipe/RecipeDetail";
import AboutUs from "./pages/AboutUs/AboutUs";

export const RecipeContext = createContext();

export default function App() {
  const apiKeys = [
    import.meta.env.VITE_API_KEY1,
    import.meta.env.VITE_API_KEY2,
    import.meta.env.VITE_API_KEY3,
    import.meta.env.VITE_API_KEY4,
  ];
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  // localStorage.clear();
 

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

  }, []);


  function randomlyPickApi(arr) {
    let randomApiKey = arr[Math.floor(Math.random() * arr.length)];
    return randomApiKey;
  }

  const currentApiKey = randomlyPickApi(apiKeys);

  const toggleFavorite = (recipe) => {
    let updatedFavorites = [...favorites];

    const existsInFavorites = favorites.some(favRecipe => favRecipe.id === recipe.id);

    if (existsInFavorites) {
        updatedFavorites = updatedFavorites.filter(favRecipe => favRecipe.id !== recipe.id);
    } else {
        updatedFavorites.push(recipe);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}



  return (
    <>
     <RecipeContext.Provider value={{ recipes, setRecipes, favorites, toggleFavorite, isModalOpen, setIsModalOpen }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home usedApiKey={currentApiKey} />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="recipePage" element={<RecipePage />} />
          <Route path="recipePage/:recipeId" element={<RecipeDetail usedApiKey={currentApiKey}/>} />
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
      </RecipeContext.Provider>
    </>
  );
}
