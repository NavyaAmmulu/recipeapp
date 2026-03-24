import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext";
import "./RecipeDetails.css";

const DEFAULT_RECIPES = [
  {
    id: 1,
    title: "Classic Pasta",
    image:
      "https://th.bing.com/th/id/OIP.EcdOu5nYKIaCLpMVwN6fcQHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    readyInMinutes: 25,
    extendedIngredients: [
      { id: 101, original: "200g pasta" },
      { id: 102, original: "2 tomatoes" },
    ],
    instructions: "Boil pasta. Cook tomatoes. Mix together.",
  },
  {
    id: 2,
    title: "Tomato Soup",
    image:
      "https://th.bing.com/th/id/OIP.qf9mKxjX3xN_sJ3F6c1e6wHaHa?pid=ImgDet&rs=1",
    readyInMinutes: 15,
    extendedIngredients: [
      { id: 201, original: "3 tomatoes" },
      { id: 202, original: "1 tsp salt" },
    ],
    instructions: "Blend tomatoes. Cook with salt. Serve hot.",
  },
];

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeDetails() {
  const { id } = useParams();

  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );

        if (res.status === 402) {
          throw new Error("API limit reached. Showing offline recipe.");
        }

        const data = await res.json();

        if (!data || data.status === "failure") {
          throw new Error("Recipe not found.");
        }

        setRecipe(data);
      } catch (err) {
        console.log(err.message);

        const offlineRecipe = DEFAULT_RECIPES.find(
          (r) => r.id === Number(id)
        );

        if (offlineRecipe) {
          setRecipe(offlineRecipe);
          setError("Showing offline version of recipe.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return <p className="details-msg">Loading recipe details...</p>;

  if (!recipe)
    return (
      <p className="details-msg">
        {error || "Recipe not found 😢"}
      </p>
    );

  return (
    <div className="page-center">
      <div className="recipe-details">

        <img src={recipe.image} alt={recipe.title} />

        <div className="details-content">

          <h1>{recipe.title}</h1>

          <p className="time">
            ⏱️ Ready in {recipe.readyInMinutes || 30} minutes
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* INGREDIENTS */}

          <h3>Ingredients</h3>

          <ul>
            {recipe.extendedIngredients &&
            recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((item) => (
                <li key={item.id}>{item.original}</li>
              ))
            ) : (
              <li>No ingredients available 😢</li>
            )}
          </ul>

          {/* INSTRUCTIONS */}

          <h3>Instructions</h3>

          {recipe.instructions ? (
            <div
              className="instructions"
              dangerouslySetInnerHTML={{
                __html: recipe.instructions,
              }}
            />
          ) : (
            <p>No instructions available 😅</p>
          )}

          {/* FAVORITE BUTTON */}

          {isFavorite ? (
            <button
              className="fav-btn remove"
              onClick={() => removeFromFavorites(recipe.id)}
            >
              💔 Remove from Favorites
            </button>
          ) : (
            <button
              className="fav-btn"
              onClick={() => addToFavorites(recipe)}
            >
              ❤️ Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;