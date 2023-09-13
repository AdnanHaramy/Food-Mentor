import React from "react";
import style from "../../../../styles/recipe-detaies/card.module.css";

const Intgredints = ({ recipe }) => {
   const ingredients = recipe.ingredients;
   const ingredient = ingredients.split("$");
   const ingredientElement = ingredient.map((el, index) => {
      if (el !== "") {
         return <li key={index}>{el}</li>;
      }
   });

   return (
      <div className={style.intgredints}>
         <h3>Intgredints :</h3>

         <ul>{ingredientElement}</ul>
      </div>
   );
};

export default Intgredints;

// <li>5 ounces baby arugula (or whatever salad greens you prefer)</li>
// <li>1 ("15-ounce)" can chickpeas, rinsed and drained</li>
// <li>half of a small red onion, peeled and thinly sliced</li>
// <li>
//    {" "}
//    half of an English cucumber, thinly sliced English cucumber,
//    thinly slice English cucumber, thinly slice
// </li>
// <li>1/2 cup diced roasted red peppers</li>
// <li>1/2 cup crumbled feta cheese</li>
// <li>half of a small red onion, peeled and thinly sliced</li>
// <li> half of an English cucumber, thinly sliced</li>
// <li>1/2 cup diced roasted red peppers</li>
// <li>1/2 cup crumbled feta cheese</li>
// <li>half of a small red onion, peeled and thinly sliced</li>
