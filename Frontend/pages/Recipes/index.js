import Image from "next/image";
import { useState } from "react";
import NavBar3 from "../../Components/navbar/NavBar3";
import RecipesContainer from "../../Components/recipe/RecipesContainer";
import style from "../../styles/recipe/Recipes.module.css";
export const getStaticProps = async () => {
   const response = await fetch(
      "http://127.0.0.1:8000/api/recipes/getAllRecipes"
   );
   const data = await response.json();
   return {
      props: { Recipes: data },
   };
};

function RecipesPage(Recipes) {
   const Recipes1 = Recipes.Recipes.data;
   const [searchTerm, setSearchTerm] = useState("");
   let [allRecipes, setAllRecipes] = useState(true);
   let [salad, setSalad] = useState(false);
   let [pasta, setPasta] = useState(false);
   let [soup, setSoup] = useState(false);
   function handleSalad() {
      setAllRecipes((allRecipes = false));
      setSoup((soup = false));
      setPasta((pasta = false));
      setSalad((salad = true));
   }
   function handlePasta() {
      setAllRecipes((allRecipes = false));
      setSoup((soup = false));
      setPasta((pasta = true));
      setSalad((salad = false));
   }
   function handleSoup() {
      setAllRecipes((allRecipes = false));
      setSoup((soup = true));
      setPasta((pasta = false));
      setSalad((salad = false));
   }
   return (
      <div className={style.allRecipesPage}>
         <NavBar3 />
         <div className={style.mainContainer}>
            <div className={style.searchContainer}>
               <input
                  className={style.searchInput}
                  type="text"
                  placeholder="Search.."
                  onChange={(event) => {
                     setSearchTerm(event.target.value);
                  }}
               />
            </div>

            <div className={style.svgContainer}>
               <Image src="/Cook1.svg" fill className={style.cookSvg} alt="" />
               <p className={style.cookSvgText}>
                  Choose What you like from our Recipes and Pick the Recipe that
                  suits your Diet!{" "}
               </p>
            </div>
            <div className={style.typeContainer}>
               <div onClick={handleSalad} className={style.type}>
                  Salad
               </div>
               <div onClick={handlePasta} className={style.type}>
                  Pasta
               </div>
               <div onClick={handleSoup} className={style.type}>
                  Soup
               </div>
            </div>
            <div className={style.container3Grid}>
               {allRecipes
                  ? Recipes1.filter((recipe) => {
                       if (searchTerm == "") {
                          return recipe;
                       } else if (
                          recipe.name
                             .toLowerCase()
                             .includes(searchTerm.toLocaleLowerCase())
                       ) {
                          return recipe;
                       }
                    }).map((recipe) => {
                       return (
                          <RecipesContainer
                             id={recipe.id}
                             key={recipe.id}
                             image={"http://127.0.0.1:8000" + recipe.image}
                             fat={recipe.fat}
                             protien={recipe.protein}
                             calories={recipe.calories}
                             name={recipe.name}
                             isVegan={recipe.vegan === 1 ? true : false}
                          />
                       );
                    })
                  : salad
                  ? Recipes1.filter((recipe) => {
                       if (searchTerm == "") {
                          return recipe;
                       } else if (
                          recipe.name
                             .toLowerCase()
                             .includes(searchTerm.toLocaleLowerCase())
                       ) {
                          return recipe;
                       }
                    }).map((recipe) =>
                       recipe.salad > 0 ? (
                          <RecipesContainer
                             id={recipe.id}
                             key={recipe.id}
                             image={"http://127.0.0.1:8000" + recipe.image}
                             fat={recipe.fat}
                             protien={recipe.protein}
                             calories={recipe.calories}
                             name={recipe.name}
                          />
                       ) : null
                    )
                  : pasta
                  ? Recipes1.filter((recipe) => {
                       if (searchTerm == "") {
                          return recipe;
                       } else if (
                          recipe.name
                             .toLowerCase()
                             .includes(searchTerm.toLocaleLowerCase())
                       ) {
                          return recipe;
                       }
                    }).map((recipe) =>
                       recipe.pasta > 0 ? (
                          <RecipesContainer
                             id={recipe.id}
                             key={recipe.id}
                             image={"http://127.0.0.1:8000" + recipe.image}
                             fat={recipe.fat}
                             protien={recipe.protein}
                             calories={recipe.calories}
                             name={recipe.name}
                          />
                       ) : null
                    )
                  : soup
                  ? Recipes1.filter((recipe) => {
                       if (searchTerm == "") {
                          return recipe;
                       } else if (
                          recipe.name
                             .toLowerCase()
                             .includes(searchTerm.toLocaleLowerCase())
                       ) {
                          return recipe;
                       }
                    }).map((recipe) =>
                       recipe.soup > 0 ? (
                          <RecipesContainer
                             id={recipe.id}
                             key={recipe.id}
                             image={"http://127.0.0.1:8000" + recipe.image}
                             fat={recipe.fat}
                             protien={recipe.protein}
                             calories={recipe.calories}
                             name={recipe.name}
                          />
                       ) : null
                    )
                  : null}
            </div>
         </div>
      </div>
   );
}
export default RecipesPage;
