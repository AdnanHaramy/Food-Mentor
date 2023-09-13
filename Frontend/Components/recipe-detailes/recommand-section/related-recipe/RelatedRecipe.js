import React from "react";
import Image from "next/image";
import style from "../../../../styles/recipe-detaies/recommand-section/RelatedRecipe.module.css";
import recipeImage from "../../../../public/recipe.png";
import starIcon from "../../../../public/star-icon.svg";
import RecipeUnit from "./RecipeUnit";
import RatingRecipe from "../../main-card/cardDetailes/RatingRecipe";
import Link from "next/link";

const RelatedRecipe = ({ recipe }) => {
   return (
      <div className={style.container}>
         <div className={style.imageContainer}>
            <Image
               src={"http://127.0.0.1:8000" + recipe.image}
               alt=""
               className={style.recipeImage}
               width={200}
               height={200}
            />
         </div>
         <div className={style.recipeInfo}>
            <h3>{recipe.name} </h3>
            <div className={style.unitsContainer}>
               <RecipeUnit unitValue={recipe.calories} unitMesaure={"Kacl"} />
               <RecipeUnit unitValue={recipe.fat} unitMesaure={"Fat"} />
               <RecipeUnit unitValue={recipe.soduim} unitMesaure={"N / A"} />
               <RecipeUnit unitValue={recipe.protein} unitMesaure={"Prot"} />
            </div>

            <div className={style.reviwe}>
               <div className={style.rating}>
                  <RatingRecipe rating={recipe.rating} />
               </div>
               <Link
                  href={`/Recipes/${recipe.id}`}
                  className={style.viewRecipe}
               >
                  <span>View Recipe</span>
                  <div className={style.arrow}></div>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default RelatedRecipe;
