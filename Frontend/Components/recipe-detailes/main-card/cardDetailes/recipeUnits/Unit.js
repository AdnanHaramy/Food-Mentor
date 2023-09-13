import React from "react";
import Image from "next/image";
import style from "../../../../../styles/recipe-detaies/card.module.css";

const Unit = ({ icon, unitName, unitValue }) => {
   return (
      <div className={style.unit}>
         <Image src={icon} alt="" className={style.unitIcon} />
         <div className={style.unitDetailes}>
            <span>{unitName} : </span>
            <span className={style.caloriesValue}>{unitValue}</span>
            {unitName === "Calories" ? <span> Kcal </span> : null}
            {unitName === "Protien" ? <span> g </span> : null}
         </div>
      </div>
   );
};

export default Unit;
