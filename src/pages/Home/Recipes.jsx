import React, { useState, useEffect } from "react";
import { recipeService } from "../../services/recipeService";
import CategoryFilter from "../../components/recipes/category/CategoryFilter";
import RecipeCard from "../../components/recipes/recipesCard/RecipeCard";
import "./recipes.css";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer"];

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let data;
        if (activeCategory === "All") {
          data = await recipeService.getAllRecipes(12, 0); 
        } else {
          data = await recipeService.getRecipesByMealType(activeCategory);
        }
        
        const formatted = data.recipes.map(recipe => ({
          image: recipe.image,
          title: recipe.name,
          description: recipe.instructions?.join(" ") || "Delicious recipe to try!",
          time: `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} MIN`,
          level: recipe.difficulty.toUpperCase(),
          serves: `${recipe.servings} SERVES`,
          id: recipe.id
        }));
        setRecipes(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchRecipes();
  }, [activeCategory]);

  const displayedRecipes = activeCategory === "All" ? recipes.slice(0, 6) : recipes;

  return (
    <main className="recipes-page container">
      <header className="recipes-page-header">
  <span className="red-badge">Recipes</span>
  <h1 className="main-heading">
    EMBARK ON A <br /> JOURNEY
  </h1>
  <p className="sub-heading-text">
    With our diverse collection of recipes we have something <br className="hide-mobile" /> to satisfy every palate.
  </p>
</header>

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cooking up {activeCategory} recipes...</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {displayedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}