import Image from "next/image";
import Link from "next/link";
import style from "../../styles/recipe/RecipesContainer.module.css";
function RecipesContainer(props) {
   return (
      <Link href={`/Recipes/${props.id}`} className={style.recipesContainer}>
         <Image
            src={props.image}
            className={style.recipesContainerImage}
            width={90}
            height={90}
            alt=""
         />
         {props.isVegan && (
            <Image
               src="/vegan.svg"
               className={style.vegan}
               height={50}
               width={50}
               alt=""
            />
         )}

         <p className={style.recipesContainerText}>{props.name}</p>
         <div className={style.itemContainer}>
            <div className={style.recipesContainerdetails}>
               <Image
                  alt=""
                  src="/calorie.svg"
                  width={20}
                  height={20}
                  className={style.recipesContainerdetailImage}
               />{" "}
               <p className={style.recipesContainerdetailText}>
                  {props.calories}
               </p>
            </div>
            <div className={style.recipesContainerdetails}>
               <Image
                  alt=""
                  src="/fat.svg"
                  width={20}
                  height={20}
                  className={style.recipesContainerdetailImage}
               />{" "}
               <p className={style.recipesContainerdetailText}>{props.fat}</p>
            </div>

            <div className={style.recipesContainerdetails}>
               <Image
                  alt=""
                  src="/protien.svg"
                  width={20}
                  height={20}
                  className={style.recipesContainerdetailImage}
               />{" "}
               <p className={style.recipesContainerdetailText}>
                  {props.protien}
               </p>
            </div>
         </div>
      </Link>
   );
}
export default RecipesContainer;
