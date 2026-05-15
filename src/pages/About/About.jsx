import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./About.css";
import ChefBio from "./ChefBio";
import FeaturedRecipes from "./FeaturedRecipes";
import { gallery } from "../../data/aboutData";
import Button from "../../components/common/button/Button";
import RecipeSlider from "../../components/recipes/recipeSlider/RecipeSlider";

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page" style={{ width: '100%', overflowX: 'hidden' }}>
      <section className="about-hero container">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>
            <span>Welcome to my  </span>
            <span>Culinary Haven!</span>
          </h1>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p>
            Bonjour and welcome to the heart of my kitchen! I'm Isabella Russo,
            the culinary enthusiast behind this haven of flavors, Cooks Delight.
            Join me on a gastronomic journey where each dish carries a story,
            and every recipe is a crafted symphony of taste.
          </p>
          <Button
            btnstyle="primary"
            onClick={() => navigate('/recipes')}
          >
            Explore Recipes
          </Button>
        </motion.div>
      </section>

      <motion.section
        className="about-main-container container"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="content-card">
          <ChefBio />
          <div className="gallery-grid">
            {gallery.map((img, index) => (
              <motion.img
                key={img.id}
                src={img.src}
                alt="Gallery"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="featured-recipes"
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container">
        <RecipeSlider title="Featured Recipes" cardsPerView={2} />
        </div>
      </motion.section>
    </main>
  );
}