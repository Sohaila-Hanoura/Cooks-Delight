import React, { useState, useEffect } from "react";
import Banner from "../../components/layout/banner/Banner";
import { useLocation } from "react-router-dom";
import { recipeService } from "../../services/recipeService";
import RecipeCard from "../../components/recipes/recipesCard/RecipeCard";
import Loader from "../../components/common/loader/Loader";
import "./search.css";

export default function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q') || '';

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!searchTerm) {
                setRecipes([]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const data = await recipeService.searchRecipes(searchTerm);
              
                setRecipes(data.recipes || []);
            } catch (err) {
                console.error("Search error:", err);
                setError("Failed to fetch recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [searchTerm]);

    return (
        <>
            <Loader loading={loading} />
            <main className="search-page">
                <div className="search-header" style={{ padding: "60px 20px", textAlign: "left", maxWidth: "1200px", margin: "0 auto" }}>
                    {searchTerm ? (
                        <h2 style={{ marginTop: "30px", fontWeight: "bold", color: "black" }}>
                            DISPLAYING RESULTS FOR <span style={{ fontWeight: "bold", color: "var(--primary-orange)" }}> "{searchTerm}"</span>
                        </h2>
                    ) : (
                        <h2 style={{ marginTop: "30px", fontWeight: "normal", color: "var(--text-gray)" }}>
                            Search for your favorite recipes 
                        </h2>
                    )}
                </div>

                <div className="search-results">
                    {error && <p className="error-message">{error}</p>}

                    {!loading && recipes.length > 0 && (
                        <div className="recipes-grid">
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={{
                                    id: recipe.id,
                                    image: recipe.image,
                                    title: recipe.name,
                                    description: recipe.instructions?.join(" ") || "No description available",
                                    time: `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins`,
                                    level: recipe.difficulty,
                                    serves: `${recipe.servings} serves`,
                                    fullIngredients: recipe.ingredients,
                                    fullInstructions: recipe.instructions
                                }} />
                            ))}
                        </div>
                    )}

                    {!loading && searchTerm && recipes.length === 0 && !error && (
                        <div className="no-results">
                            <p>No recipes found matching your search.</p>
                        </div>
                    )}
                </div>
            </main >

        </>
    );
}
