import Image from "next/image";
import style from "../../styles/weekly program/weeklyProgramContainer.module.css";
import RatingRecipe from "../recipe-detailes/main-card/cardDetailes/RatingRecipe";
import Link from "next/link";
import { useEffect, useState } from "react";
function WeeklyProgramContainer({
   recipe,
   type,
   path,
   isChecked,
   programId,
   statues,
   typeColor,
}) {
   // const [check, setCheck] = useState(statues);

   const clickHandling = () => {
      isChecked(+!statues, programId);
   };

   // useEffect(() => {
   //    isChecked(+check, programId);
   // }, [check]);

   return (
      <div className={style.weeklyContainer}>
         <div className={style.imageContainer}>
            <Image
               className={style.weeklyContainerImage}
               src={"http://127.0.0.1:8000" + recipe.image}
               height={100}
               width={100}
               alt=""
            />
            <div
               className={style.mealTime}
               style={{ backgroundColor: typeColor }}
            >
               {type}
            </div>
         </div>

         <div className={style.detailes}>
            <p className={style.weeklyContainerParagraph}>{recipe.name}</p>
            <div className={style.starContainer}>
               <RatingRecipe rating={recipe.rating} />
            </div>
            <div className={style.weeklyContainerDetails}>
               <p>
                  Kcal <span> {recipe.calories} </span>
               </p>

               <p>
                  Fat <span> {recipe.fat} g </span>
               </p>
               <p>
                  Protien <span> {recipe.protein} g </span>
               </p>
            </div>
         </div>
         <div className={style.viewRecipe}>
            <Link href={`${path}`}>
               <button>View Recipe</button>{" "}
            </Link>

            <label>Done !</label>
            <input
               type="checkbox"
               name="check"
               checked={statues}
               onChange={clickHandling}
            />
         </div>
      </div>
   );
}
export default WeeklyProgramContainer;
