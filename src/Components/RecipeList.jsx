import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

function RecipeList({ recipes = [], loading = false }) {
  if (loading) {
    return <p className="no-data">Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p className="no-data">No recipes found 🍳</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;

