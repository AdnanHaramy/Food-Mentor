import React from "react";
import style from "../../styles/recommended recipes/recommendedRecipe.module.css";
import Image from "next/image";

const RecommendedRecipe = ({ recipe }) => {
   return (
      <div className={style.recipeContainer}>
         <div className={style.imageContainer}>
            <Image
               src={"http://127.0.0.1:8000" + recipe.image}
               width={70}
               height={70}
               alt=""
            />
         </div>
         <h2 className={style.recipeHeader}>{recipe.name}</h2>
      </div>
   );
};

export default RecommendedRecipe;
