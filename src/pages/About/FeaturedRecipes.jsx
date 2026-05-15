import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { recipeService } from "../../services/recipeService";
import RecipeCard from "../../components/recipes/recipesCard/RecipeCard";
import "./featured.css";

import tipsData from "../../data/customTips.json";
import basicsData from "../../data/cookingBasics.json";

export default function FeaturedRecipes({ title, cardsPerView = 2, dataSource = "api", buttonText = "VIEW RECIPE", noBorder = false }) {
    const [recipes, setRecipes] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [loading, setLoading] = useState(true);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const cardsToShow = cardsPerView;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);

                let data = [];

                if (dataSource === "api") {
                    const res = await recipeService.getAllRecipes(8, 0);
                    data = res.recipes.map(recipe => ({
                        image: recipe.image,
                        title: recipe.name,
                        description:
                            recipe.instructions?.[0]?.substring(0, 80) + "..." ||
                            "A delightful culinary experience...",
                        time: `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} MIN`,
                        level: recipe.difficulty.toUpperCase(),
                        serves: `${recipe.servings} SERVES`,
                        id: recipe.id
                    }));
                }

                else if (dataSource === "tips") {
                    data = tipsData;
                }

                else if (dataSource === "basics") {
                    data = basicsData;
                }

                setRecipes(data);

            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [dataSource]);

    const next = () => {
        if (index + cardsToShow < recipes.length) {
            setDirection(1);
            setIndex(prev => prev + cardsToShow);
        }
    };

    const prev = () => {
        if (index - cardsToShow >= 0) {
            setDirection(-1);
            setIndex(prev => prev - cardsToShow);
        }
    };
    if (loading) return <div className="featured-loading">Loading...</div>;

    return (
        <div className={`featured container ${noBorder ? "no-border" : ""}`}>
            <div className="featured-inner">

                <div className="featured-header">
                    <h2>{title}</h2>

                    <div className="arrows">
                        <button onClick={prev} disabled={index === 0}>
                            <FiChevronLeft />
                        </button>

                        <button onClick={next} disabled={index >= recipes.length - cardsToShow}>
                            <FiChevronRight />
                        </button>
                    </div>
                </div>

                <div className="featured-cards-wrapper">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={index}
                            className={`featured-cards-grid ${cardsPerView === 6 ? "six-cards" : "two-cards"
                                }`}
                            initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {recipes.slice(index, index + cardsToShow).map((recipe) => (
                                <div key={recipe.id} className="recipe-card-box">
                                    <RecipeCard
                                        recipe={recipe}
                                        buttonText={buttonText}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}