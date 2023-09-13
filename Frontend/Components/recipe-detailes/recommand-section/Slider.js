import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import RelatedRecipe from "../../../Components/recipe-detailes/recommand-section/related-recipe/RelatedRecipe";
import recipeImage from "../../../public/recipe.png";
import "bootstrap/dist/css/bootstrap.min.css";

const ControlledCarousel = ({ recommendedRecipes }) => {
   // Logic Of Slider

   const [index, setIndex] = useState(0);
   const [recipes, setRecipes] = useState([]);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };

   let sec = recommendedRecipes.map((el) => {
      return (
         <Carousel.Item className="item" key={el.id}>
            <RelatedRecipe recipe={el} />
         </Carousel.Item>
      );
   });

   // ===================================================================================
   return (
      <Carousel activeIndex={index} onSelect={handleSelect} className="slider">
         {sec}
      </Carousel>
   );
};

export default ControlledCarousel;
