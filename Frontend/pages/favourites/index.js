import NavBar2 from "../../Components/navbar/NavBar2";
import Image from "next/image";
import Link from "next/link";
import TopRecipesContainer from "../../Components/weekly program/TopRecipesContainer";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import style from "../../styles/favourite/favourites.module.css";
import RecommendedRecipe from "../../Components/recommended recipes/RecommendedRecipe";

function Favourites() {
   const [favoriteData, setFavoriteData] = useState([]);
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

   const compilationUserVector = () => {
      let helper = [];
      favoriteData.map((el) => {
         helper.push(el.recipeVector);
      });
      let userVector = { vegan: 0, pasta: 0, soup: 0, salad: 0, others: 0 };
      helper.map((el) => {
         userVector.vegan += el.vegan;
         userVector.pasta += el.pasta;
         userVector.soup += el.soup;
         userVector.salad += el.salad;
         userVector.others += +el.others;
      });
      userVector = [
         userVector.vegan,
         userVector.pasta,
         userVector.soup,
         userVector.salad,
         userVector.others,
      ];

      return userVector;
   };

   // ------------------------------------------------------------------

   // -----------------Cosine Similarity --------------------------------

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

   // ------------------------------------------------------

   useEffect(() => {
      if (favoriteData.length !== 0 && recipes.length !== 0) {
         let userVector = compilationUserVector();
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
            similarity = model(userVector, recipeVector);
            recommendedPossible.push({ id: el.id, angle: similarity });
         });
         recommendedPossible.sort((a, b) => a.angle - b.angle);
         recommendedPossible.reverse();
         let topHelper = [];
         for (let i = 0; i < 8; i++) {
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
   }, [favoriteData]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const baseUrl = "http://127.0.0.1:8000";
         let token = localStorage.getItem("token");
         const res = await axios.post(
            baseUrl + "/api/users/getFavorite",
            {},
            {
               headers: {
                  Authorization: token,
               },
            }
         );
         const data = res.data.data.data;
         setFavoriteData(data);
      } catch (error) {
         console.log(error);
      }
   };
   async function handleRemove(id) {
      const baseUrl = "http://127.0.0.1:8000";
      let token = localStorage.getItem("token");
      const res = axios.post(
         baseUrl + "/api/users/deleteFavorite",
         {
            recipe_id: id,
         },
         {
            headers: {
               Authorization: token,
            },
         }
      );
      fetchData();
   }

   return (
      <div className={style.favoritePage}>
         <NavBar2 />
         <div className={style.favoriteContainer}>
            <div className={style.favouritesBox}>
               <div className={style.favouritesTextContainer}>
                  <p className={style.favouritesBoxText1}>
                     Browse your Favourite Recipes and Make Sure to Keep Adding
                     to this List to Stay Healthy!
                  </p>
                  <p className={style.favouritesBoxText2}>
                     Check All the Recipes and discover More Healthy Food!
                  </p>
                  <Link href="/Recipes">
                     <div className={style.favouriteButton}>
                        View All Recipes
                     </div>
                  </Link>
               </div>
               <div className={style.favouritesImageContainer}>
                  <Image
                     className={style.favouritesBoxImage}
                     src="/chef.svg"
                     width={200}
                     height={160}
                     alt=""
                  />
               </div>
            </div>

            <div className={style.favouritesGrid}>
               {favoriteData.length > 0 ? (
                  favoriteData.map((item) => {
                     return (
                        <div className={style.recipeContainer}>
                           <Link
                              className={style.link}
                              href={`/Recipes/${item.id}`}
                           >
                              <div
                                 key={item.id}
                                 className={style.favouritesContainer}
                              >
                                 <Image
                                    className={style.favouriteContainerImage}
                                    src={"http://127.0.0.1:8000" + item.image}
                                    width={75}
                                    height={75}
                                 />
                                 <p className={style.favouritesParagraph}>
                                    {item.name}
                                 </p>
                              </div>
                           </Link>
                           <button
                              onClick={() => handleRemove(item.id)}
                              key={item.id}
                              className={style.favouriteContainerButton}
                           >
                              Remove
                           </button>
                        </div>
                     );
                  })
               ) : (
                  <p className={style.noFav}>
                     Sorry , You Don't Have any Favourite Recipes , Add some
                     recipes to see them here..
                  </p>
               )}
            </div>
         </div>
         {topRecipesRecomende.length !== 0 ? (
            <div className={style.recommendedRecipesSection}>
               <h3 className={style.recommendedHeader}>Recommended For You</h3>
               <div className={style.recommendedRecipesContainer}>
                  <Link href={`/Recipes/${topRecipesRecomende[0].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[0]} />
                  </Link>
                  <Link href={`/Recipes/${topRecipesRecomende[1].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[1]} />
                  </Link>
                  <Link href={`/Recipes/${topRecipesRecomende[2].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[2]} />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipesRecomende[3].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[3]} />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipesRecomende[4].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[4]} />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipesRecomende[5].id}`}>
                     <RecommendedRecipe recipe={topRecipesRecomende[5]} />
                  </Link>
               </div>
            </div>
         ) : null}
      </div>
   );
}
export default Favourites;

{
}
