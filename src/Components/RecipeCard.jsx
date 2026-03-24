import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../Pages/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {

  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const { darkMode } = useContext(ThemeContext);

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();

    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className={`recipe-card ${darkMode ? "dark" : ""}`}>

      <span
        className={`fav-badge-card ${isFavorite ? "added" : ""}`}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? "💔" : "❤️"}
      </span>

      <img
        src={recipe.image || "https://via.placeholder.com/300"}
        alt={recipe.title}
        className="recipe-image"
      />

      <div className="recipe-content">

        <h3 className="recipe-title">{recipe.title}</h3>

        <p className="recipe-category">
          {recipe.category || "General"}
        </p>

        <p className="recipe-time">
          {recipe.readyInMinutes || 30} mins
        </p>

        <Link to={`/recipe/${recipe.id}`} className="view-btn">
          View Recipe →
        </Link>

      </div>
    </div>
  );
}

export default RecipeCard;