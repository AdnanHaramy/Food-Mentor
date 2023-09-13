import Card from "../../Components/recipe-detailes/main-card/Card";
import HeaderSlider from "../../Components/recipe-detailes/recommand-section/HeaderSlider";
import Slider from "../../Components/recipe-detailes/recommand-section/Slider";
import React from "react";
import Image from "next/image";
import axios from "axios";

export const getStaticPaths = async () => {
   const response = await fetch(
      "http://127.0.0.1:8000/api/recipes/getAllRecipes"
   );
   const Data = await response.json();
   const paths = Data.data.map((recipe) => {
      return {
         params: {
            id: recipe.id.toString(),
         },
      };
   });
   return {
      paths,
      fallback: false,
   };
};
export const getStaticProps = async (context) => {
   const id = context.params.id;
   const baseUrl = "http://127.0.0.1:8000";
   const res = axios.post(baseUrl + "/api/recipes/find", { id: id });
   const data = await (await res.then()).data.data;
   return {
      props: { recipes: data },
   };
};

const CardPage = (recipes) => {
   const recipe = recipes.recipes;
   const image = "http://127.0.0.1:8000" + recipe.image;
   // ================================================================

   // ================================================================
   return (
      <div className="cardPage" style={{ paddingBottom: "50px" }}>
         <Card recipe={recipe} image={image} />
      </div>
   );
};

export default CardPage;
