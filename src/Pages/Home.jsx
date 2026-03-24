import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../Components/RecipeList";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const DEFAULT_RECIPES = [
  {
    id: 1,
    title: "Classic Pasta",
    image:
      "https://th.bing.com/th/id/OIP.EcdOu5nYKIaCLpMVwN6fcQHaHa?w=208&h=208&c=7&r=0&o=7",
    readyInMinutes: 25,
    category: "Italian",
  },
  {
    id: 2,
    title: "Tomato Soup",
    image:
      "https://th.bing.com/th/id/OIP.lkW7RxVLFYS-8DXMU7zS0QHaHa?w=216&h=188&c=7&r=0&o=7",
    readyInMinutes: 15,
    category: "Soup",
  },
  {
    id: 3,
    title: "Grilled Sandwich",
    image:
      "https://th.bing.com/th/id/OIP.fFcq8f_J6gZscbZdWjzhUwHaE8?w=278&h=185&c=7&r=0&o=7",
    readyInMinutes: 10,
    category: "Snacks",
  },
  {
    id: 4,
    title: "Pancakes",
    image:
      "https://th.bing.com/th/id/OIP.fFcq8f_J6gZscbZdWjzhUwHaE8?w=278&h=185&c=7&r=0&o=7",
    readyInMinutes: 20,
    category: "Breakfast",
  },
];

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // pagination
  const [hasMore, setHasMore] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const fetchRecipes = async (reset = false) => {
    try {
      setLoading(true);

      const offset = reset ? 0 : page * 12;

      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12&offset=${offset}&addRecipeInformation=true`;

      if (query) {
        url += `&query=${query}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
      }

      if (reset) {
        setRecipes(data.results);
      } else {
        setRecipes((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes(DEFAULT_RECIPES);
    } finally {
      setLoading(false);
    }
  };

  // When search changes → reset page
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchRecipes(true);
  }, [query]);

  // When page increases → load more
  useEffect(() => {
    if (page === 0) return;
    fetchRecipes();
  }, [page]);

  return (
    <div className="home" style={{ padding: "0px 50px" }}>
      <h1>{query ? `Search Results for "${query}"` : "Popular Recipes"}</h1>

      {loading && page === 0 && <p>Loading recipes...</p>}

      <RecipeList recipes={recipes.length > 0 ? recipes : DEFAULT_RECIPES} />

      {loading && page > 0 && <p>Loading more...</p>}

      {!loading && hasMore && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </button>
        </div>
      )}

      {!hasMore && <p style={{ textAlign: "center" }}>No more recipes.</p>}
    </div>
  );
}

export default Home;