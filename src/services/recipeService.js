import api from "./axios";

export const recipeService = {
  
  // Get all recipes with limit and skip
  getAllRecipes: async (limit = 30, skip = 0) => {
    try {
      const response = await api.get(`/recipes?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      throw error; 
    }
  },

  // Search recipes by name or ingredients
  searchRecipes: async (query) => {
    try {
      const response = await api.get(`/recipes/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error("Error searching recipes:", error);
      throw error;
    }
  },

  // Get single recipe details by ID
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error;
    }
  },

  // Get recipes by meal type 
  getRecipesByMealType: async (mealType) => {
    try {
      const response = await api.get(`/recipes/meal-type/${mealType}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipes by meal type:", error);
      throw error;
    }
  },

  // Get recipes by tag 
  getRecipesByTag: async (tag) => {
    try {
      const response = await api.get(`/recipes/tag/${tag}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipes by tag:", error);
      throw error;
    }
  }
};