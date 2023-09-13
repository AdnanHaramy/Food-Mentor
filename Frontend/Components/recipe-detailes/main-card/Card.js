import React, { Fragment, useState, useEffect } from "react";
import style from "../../../styles/recipe-detaies/card.module.css";
import Directions from "./directions/Directions";
import Detailes from "./cardDetailes/Detailes";
import RecipeInfo from "./recipe-info/RecipeInfo";
import HeaderSlider from "../recommand-section/HeaderSlider";
import Slider from "../recommand-section/Slider";

const Card = ({ recipe, image }) => {
   const [recipes, setRecipes] = useState([]);
   const [topRecipesRecomende, setTopRecipesRecomende] = useState([]);

   async function fetchRecipes() {
      const response = await fetch(
         "http://127.0.0.1:8000/api/recipes/getAllRecipes"
      );
      const data = await response.json();
      setRecipes(data.data);
   }

   useEffect(() => {
      fetchRecipes();
   }, []);

   // ================================================================
   const model = (x, y) => {
      let multipel = 0;
      x.map((el, index) => {
         multipel += el * y[index];
      });
      let xSquar = 0;
      x.map((el) => {
         xSquar += el * el;
      });

      let ySquar = 0;
      y.map((el) => {
         ySquar += el * el;
      });

      let long = Math.sqrt(xSquar) * Math.sqrt(ySquar);

      let cosineAngle = multipel / long;

      return cosineAngle;
   };

   //==========================================================================

   useEffect(() => {
      if (recipes.length !== 0) {
         let currentRecipeVector = [
            recipe.recipeVector.vegan,
            recipe.recipeVector.pasta,
            recipe.recipeVector.soup,
            recipe.recipeVector.salad,
            +recipe.recipeVector.others,
         ];

         let recommendedPossible = [];
         let similarity = 0;
         recipes.map((el) => {
            let recipeVector = el.recipeVector;
            recipeVector = [
               recipeVector.vegan,
               recipeVector.pasta,
               recipeVector.soup,
               recipeVector.salad,
               +recipeVector.others,
            ];
            similarity = model(currentRecipeVector, recipeVector);
            recommendedPossible.push({ id: el.id, angle: similarity });
         });
         recommendedPossible.sort((a, b) => a.angle - b.angle);
         recommendedPossible.reverse();
         let topHelper = [];
         for (let i = 0; i < 20; i++) {
            topHelper.push(recommendedPossible[i]);
         }

         let topHelperDetaiels = [];

         for (let i = 0; i < topHelper.length; i++) {
            recipes.map((el) => {
               if (topHelper[i].id === el.id) {
                  topHelperDetaiels.push(el);
               }
            });
         }

         setTopRecipesRecomende(topHelperDetaiels);
      }
   }, [recipes]);

   //==========================================================================

   return (
      <Fragment>
         <div className={style.card}>
            <div className={style.container}>
               <div className={style.mainCard}>
                  <Detailes recipe={recipe} image={image} />
                  <RecipeInfo recipe={recipe} />
               </div>
               <Directions recipe={recipe} />
            </div>
         </div>
         {
            //children
         }
         <HeaderSlider />
         <Slider recommendedRecipes={topRecipesRecomende} />
      </Fragment>
   );
};

export default Card;
