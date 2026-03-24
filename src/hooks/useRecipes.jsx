import { useEffect, useState } from "react";
import { getRecipes, saveRecipes } from "../utils/localStorage";

function useRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = getRecipes();

    if (storedRecipes.length === 0) {
      const initialData = [
        {
          id: 1,
          title: "Veg Fried Rice",
          image: "https://via.placeholder.com/300",
          category: "Dinner",
          readyInMinutes: 25,
        },
      ];

      saveRecipes(initialData);   
      setRecipes(initialData);
    } else {
      setRecipes(storedRecipes);
    }
  }, []);

  return { recipes, setRecipes };
}

export default useRecipes;
