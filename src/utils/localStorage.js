// CREATE / UPDATE DATABASE
export const saveRecipes = (recipes) => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// READ DATABASE
export const getRecipes = () => {
  const data = localStorage.getItem("recipes");
  return data ? JSON.parse(data) : [];
};

// DELETE DATABASE
export const clearRecipes = () => {
  localStorage.removeItem("recipes");
};
