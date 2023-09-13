import React from "react";
import Image from "next/image";
import style from "../../../../../styles/recipe-detaies/card.module.css";
import starIcon from "../../../../../public/star-icon.svg";
import RatingRecipe from "../RatingRecipe";

const ViweType = ({ recipe }) => {
   return (
      <div className={style.viweType}>
         <div className={style.review}>
            <span>Review :</span>
            <RatingRecipe rating={recipe.rating} />
         </div>

         <div className={style.recipeType}>
            Type : <span>{recipe.vegan ? "Vegan" : "not Vegan"}</span>
         </div>
      </div>
   );
};

export default ViweType;
