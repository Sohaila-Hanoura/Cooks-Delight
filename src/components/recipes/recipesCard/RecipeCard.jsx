import "./RecipeCard.css";
import Button from "../../common/button/Button";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, buttonText = "VIEW RECIPE" }) => {

  const isApiRecipe = recipe.time && recipe.level;
  const isBasic = recipe.category && recipe.readTime;
  const isTip = recipe.importance;
  const navigate = useNavigate();
  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (


    <div className={` recipe-card ${isTip ? "tip-mode" : ""}`}>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-body">
        <h3 className="recipe-title">{recipe.title}</h3>

        <p className="recipe-desc">{recipe.description}</p>

        <div className="recipe-footer">
          <span className="recipe-meta">
            {isApiRecipe && `${recipe.time} - ${recipe.level} - ${recipe.serves}`}

            {isBasic && `${recipe.category} - ${recipe.readTime}`}

            {isTip && `${recipe.importance} TIP`}
          </span>
          <Button btnstyle="outline" className="recipe-btn  " onClick={handleViewRecipe}   >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;