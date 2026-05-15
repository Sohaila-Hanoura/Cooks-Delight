import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "../recipesCard/RecipeCard";
import "./RecipeSlider.css";
import { recipeService } from "../../../services/recipeService";

const RecipeSlider = ({ title }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes(10);
        const mappedRecipes = data.recipes.map(recipe => ({
          id: recipe.id,
          image: recipe.image,
          title: recipe.name,
          description: recipe.instructions?.join(" ") || "No description available",
          time: `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins`,
          level: recipe.difficulty,
          serves: `${recipe.servings} serves`,
          fullIngredients: recipe.ingredients,
          fullInstructions: recipe.instructions
        }));
        setRecipes(mappedRecipes);
      } catch (error) {
        console.error("Error fetching recipes for slider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const next = () => {
    if (index < recipes.length - 2) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

  if (loading) {
    return <div className="recipe-slider-loading">Loading recipes...</div>;
  }

  return (
    <div className="recipe-slider container">
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>
        <div className="arrows">
          <button className="slider-control-btn" onClick={prev} disabled={index === 0}>
            <FiChevronLeft />
          </button>
          <button className="slider-control-btn" onClick={next} disabled={index >= recipes.length - 2}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="slider-container">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className="slider-track"
            initial={{ x: direction > 0 ? "20%" : "-20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-20%" : "20%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {recipes.slice(index, index + 2).map((recipe) => (
              <div className="slider-item" key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipeSlider;
