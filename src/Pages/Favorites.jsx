import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import RecipeList from "../Components/RecipeList";


function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "20px" }}>
        ❤️ Your Favorite Recipes
      </h2>
      <RecipeList recipes={favorites} />
    </>
  );
}

export default Favorites;
