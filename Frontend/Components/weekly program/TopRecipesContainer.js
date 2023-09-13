import Image from "next/image";
import style from "../../styles/weekly program/topRecipesContainer.module.css";
function TopRecipesContainer({ recipe, bkgColor }) {
   return (
      <div className={style.topRecipesContainer}>
         <div className={style.smallRect} style={{ backgroundColor: bkgColor }}>
            <Image
               src={"http://127.0.0.1:8000" + recipe.image}
               width={50}
               height={50}
               alt=""
            />
         </div>
         <h2 className={style.TopRecipesHeader}>{recipe.name}</h2>
      </div>
   );
}
export default TopRecipesContainer;
