import React from "react";
import style from "../../../../styles/recipe-detaies/card.module.css";
import Intgredints from "../intgredints/Intgredints ";

const RecipeInfo = ({ recipe }) => {
   let name = recipe.name;

   function normalizeSpace(str) {
      return str.replace(/\s+/g, " ").trim();
   }
   return (
      <div className={style.recipeInfo}>
         <h2>{normalizeSpace(recipe.name)}</h2>
         <Intgredints recipe={recipe} />
      </div>
   );
};

export default RecipeInfo;
