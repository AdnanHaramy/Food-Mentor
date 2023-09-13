import React from "react";
import Image from "next/image";
import style from "../../styles/home/landingAbout.module.css";
import recipeBottom from "../../public/landing-page/recipe-bottom.png";

const LandingAbout = () => {
   return (
      <div className={style.landingAbout}>
         <div className={style.effect}>About</div>
         <div className={style.container}>
            <div className={style.image}>
               <Image
                  src={recipeBottom}
                  alt=""
                  className={style.landingAboutImage}
               />
            </div>
            <div className={style.text}>
               <h3>Food Is An Important Part Of A Balanced Diet</h3>
               <p>
                  Eating a wide variety of nutritious foods, including fruit,
                  vegetables, nuts, seeds, and lean protein can help support
                  your overall health. It’s easy to wonder which foods are
                  healthiest. By our website we provide you with foods are both
                  healthy and tasty. By filling your plate with fruits,
                  vegetables, quality protein sources, and other whole foods,
                  you’ll have meals that are colorful, versatile, and good for
                  you. Here are more 200 incredibly healthy foods. Most of them
                  are surprisingly delicious
               </p>
            </div>
         </div>
      </div>
   );
};

export default LandingAbout;
