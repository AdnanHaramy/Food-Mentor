import React from "react";
import Image from "next/image";
import style from "../../styles/home/feature.module.css";
import healthy from "../../public/landing-page/healthy-food-icon.svg";
import calander from "../../public/landing-page/calendar-date-icon.svg";
import vegan from "../../public/landing-page/food-dish-icon.svg";
const Feature = () => {
   return (
      <div className={style.features}>
         <div className={style.effect}>Features</div>
         <div className={style.featuresContainer}>
            <div className={style.feature}>
               <Image src={healthy} alt="" className={style.featureImage} />
               <h3>Easy & Healthy</h3>
               <p>We Provide You Easy & Healthy Recipes</p>
            </div>
            <div className={style.feature}>
               <Image src={calander} alt="" className={style.featureImage} />
               <h3>Weekly Program</h3>
               <p>Delicious Dishes Every Day</p>
            </div>
            <div className={style.feature}>
               <Image src={vegan} alt="" className={style.featureImage} />
               <h3>Vegan & Vegetarian</h3>
               <p>Recipes Fit Your Desires</p>
            </div>
         </div>
      </div>
   );
};

export default Feature;
