import React from "react";
import style from "../../../../styles/recipe-detaies/recommand-section/RelatedRecipe.module.css";

const RecipeUnit = ({ unitValue, unitMesaure }) => {
   return (
      <div className={style.reUnit}>
         <span>{unitValue}</span>
         <span>{unitMesaure}</span>
      </div>
   );
};

export default RecipeUnit;
