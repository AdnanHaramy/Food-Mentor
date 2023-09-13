import React from "react";
import Image from "next/image";
import style from "../../../styles/recipe-detaies/recommand-section/HeaderSlider.module.css";
import waveImage from "../../../public/wave.svg";

const HeaderSlider = () => {
   return (
      <div className={style.header}>
         <Image src={waveImage} alt="" className={style.wave} />
         <div className={style.container}>
            <h3>Easy & healthy</h3>
            <p>
               Get inspired by our nutritious flavour-packed recipes including
               vegetarian, vegan and meat options.
            </p>
         </div>
      </div>
   );
};

export default HeaderSlider;
