import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    const exists = favorites.find((item) => item.id === recipe.id);
    if (!exists) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;

