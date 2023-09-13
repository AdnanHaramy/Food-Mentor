import React from "react";
import Image from "next/image";
import style from "../../../../styles/recipe-detaies/card.module.css";
import ViweType from "./viwe-type/ViweType";
import RecipeUnit from "./recipeUnits/RecipeUnit";
import chefImage from "../../../../public/checkbox.svg";
import recipeImage from "../../../../public/recipe.png";

const Detailes = ({ recipe, image }) => {
   return (
      <div className={style.detailes}>
         <div className={style.imgContainer}>
            <Image
               src={image}
               alt=""
               className={style.recipeImage}
               width={350}
               height={350}
            />
         </div>
         <ViweType recipe={recipe} />
         <RecipeUnit recipe={recipe} />
      </div>
   );
};

export default Detailes;
