import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../Home/Hero';
import Categories from './Categories';
import RecipeSlider from "../../components/recipes/recipeSlider/RecipeSlider";
import CategoryFilter from '../../components/recipes/category/CategoryFilter';
import Recipes from './Recipes';
import CulinarySection from './CulinarySection';

const Home = () => {
  return (
    <main style={{ width: '100%', overflowX: 'hidden', position: 'relative' , overflowY: 'hidden'}}>
      
      <motion.section
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Categories />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <RecipeSlider title="Featured Recipes" cardsPerView={2} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Recipes />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <CulinarySection />
      </motion.section>

    </main>
  );
};

export default Home;