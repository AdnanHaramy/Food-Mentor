import React from "react";
import style from "../../../../../styles/recipe-detaies/card.module.css";
import Unit from "./Unit";
import caloriesIcon from "../../../../../public/calories-icon.svg";
import fatIcon from "../../../../../public/fat-icon.png";
import sodiumIcon from "../../../../../public/sodiume-icon.svg";
import protienIcon from "../../../../../public/protein-icon.png";

const RecipeUnit = ({ recipe }) => {
   return (
      <div className={style.recipeUnits}>
         <div className={style.calFat}>
            <Unit
               icon={caloriesIcon}
               unitName={"Calories"}
               unitValue={recipe.calories}
            />
            <Unit icon={fatIcon} unitName={"Fat"} unitValue={recipe.fat} />
         </div>

         <div className={style.sodProt}>
            <Unit
               icon={sodiumIcon}
               unitName={"Sodium"}
               unitValue={recipe.soduim}
            />
            <Unit
               icon={protienIcon}
               unitName={"Protien"}
               unitValue={recipe.protein}
            />
         </div>
      </div>
   );
};

export default RecipeUnit;
