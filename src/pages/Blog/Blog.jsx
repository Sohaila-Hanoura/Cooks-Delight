import React, { useEffect, useState } from 'react';
import './Blog.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBellConcierge, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaInstagram, FaWeightHanging, FaYoutube } from 'react-icons/fa';
import pizzaImg from '../../assets/images/pizza.png';
import RecipeSlider from "../../components/recipes/recipeSlider/RecipeSlider";
import { recipeService } from "../../services/recipeService";
import { Weight } from 'lucide-react';
import ChefBio from '../About/ChefBio';

const normalizeRecipe = (recipe = {}) => ({
    title: recipe.title || recipe.name || "Untitled Recipe",

    image: recipe.image || pizzaImg,

    description: "Welcome to Cooks Delight, where culinary dreams come alive! Today, we embark on a journey of flavors with a dish that promises to elevate your dining experience – " + recipe.name,

    time:
        recipe.time ||
        ((recipe.prepTimeMinutes || recipe.cookTimeMinutes)
            ? `${(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} mins`
            : "N/A"),

    difficulty: recipe.difficulty || recipe.level || "N/A",

    serves:
        recipe.serves ||
        (recipe.servings ? `${recipe.servings} serves` : "N/A"),

    cuisine: recipe.cuisine || "Not specified",

    instructions: Array.isArray(recipe.fullInstructions)
        ? recipe.fullInstructions
        : Array.isArray(recipe.instructions)
            ? recipe.instructions
            : [],

    ingredients: Array.isArray(recipe.fullIngredients)
        ? recipe.fullIngredients
        : Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [],

    rating: Number(recipe.rating) || 4.5,
    reviewCount: Number(recipe.reviewCount) || 20,

    categories: Array.isArray(recipe.tags)
        ? recipe.tags
        : ["GENERAL"],

    mealType: Array.isArray(recipe.mealType)
        ? recipe.mealType.join(", ")
        : recipe.mealType || "Not specified",

    calories: recipe.caloriesPerServing ?? 300,
});

const Blog = () => {
    const { id } = useParams();

    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await recipeService.getRecipeById(id);
                setRecipeData(data);
            } catch (err) {
                setError("Failed to load recipe.");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <p className="loading">Loading recipe...</p>;

    if (error) return <p className="error">{error}</p>;

    const displayData = normalizeRecipe(recipeData);

    const renderStars = (rating) => {
        const safe = Math.min(5, Math.max(0, rating));
        const full = Math.floor(safe);
        const half = safe % 1 >= 0.5;

        return (
            <>
                {"★".repeat(full)}
                {half && "☆"}
                {"☆".repeat(5 - full - (half ? 1 : 0))}
            </>
        );
    };

    return (
        <div className="blog-page">
            <div className="blog-container ">

                {/* HEADER */}
                <header className="blog-header">
                    <div className="container">
                        <div className="recipe-badge">RECIPE</div>
                        <h1 className="recipe-title">{displayData.title}</h1>
                        <p className="recipe-desc">{displayData.description}</p>

                        <div className="recipe-meta">
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faClock} /> {displayData.time}
                            </div>
                            <div className="meta-item">
                                <FaWeightHanging /> {displayData.difficulty}
                            </div>
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faBellConcierge} /> {displayData.serves}
                            </div>
                        </div>
                    </div>
                </header>

                {/* IMAGE */}
                <section className="recipe-main-image container">
                    <img src={displayData.image} alt={displayData.title} className="hero-image" />

                    <div className="image-meta">
                        <div className="rating">
                            <span className="stars">{renderStars(displayData.rating)}</span>
                            <span className="dot"> • </span>
                            <span className="review-count">
                                {displayData.reviewCount > 0
                                    ? `${displayData.reviewCount} REVIEWS`
                                    : "No reviews yet"}
                            </span>
                        </div>
                        <span className="dot"> • </span>

                        <div className="categories">
                            {displayData.categories.slice(0, - 1).map((cat, i) => (
                                <span key={i} className="category-tag">
                                    {cat.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        <span className="dot"> • </span>

                        <div className="categories">

                            <span className="cuisine-tag">
                                {displayData.cuisine.toUpperCase()}
                            </span>

                        </div>
                    </div>
                </section>

                {/* CONTENT */}
                <section className="recipe-content container">
                    <div className="content-grid">

                        {/* INSTRUCTIONS */}
                        <div className="instructions-section">
                            <h2>INSTRUCTIONS</h2>

                            <div className="steps-list">
                                {displayData.instructions.length > 0 ? (
                                    displayData.instructions.map((step, i) => (
                                        <p key={i}>
                                            <strong>Step {i + 1})</strong> {step}
                                        </p>
                                    ))
                                ) : (
                                    <p>No instructions available.</p>
                                )}
                            </div>

                            <div className="share-pill">
                                <span>SHARE</span>
                                <div className="share-icons">
                                    <FaFacebook />
                                    <FaInstagram />
                                    <FaYoutube />
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR */}
                        <div className="sidebar-section">

                            <div className="ingredients-card">
                                <h3>INGREDIENTS</h3>
                                <ul>
                                    {displayData.ingredients.length > 0 ? (
                                        displayData.ingredients.map((ing, i) => (
                                            <li key={i}>{ing}</li>
                                        ))
                                    ) : (
                                        <li>No ingredients listed.</li>
                                    )}
                                </ul>
                            </div>

                            <div className="nutrition-card">
                                <h3>NUTRITIONAL VALUE</h3>
                                <p>Per serving:</p>

                                <p>
                                    <strong>Calories:</strong>{" "}
                                    ~ {displayData.calories} kcal
                                </p>

                                <p>
                                    <strong>Meal Type:</strong>{" "}
                                    {displayData.mealType}
                                </p>
                            </div>

                            <p className="note">
                                NOTE: Nutritional values are approximate.
                            </p>
                        </div>

                    </div>
                </section>
            </div>

            {/* SIMILAR */}
            <section className="similar-recipes container">
                <RecipeSlider title="Similar RECIPES" />
            </section>
        </div>
    );
};

export default Blog;