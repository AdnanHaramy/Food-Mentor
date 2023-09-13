import React from 'react'
import style from "../card.module.css";
import chefImage from "../../../../image/chef-image.jfif";


const Chefs = () => {
  return (
    <div className={style.chef}>

        <div className={style.chefWrapper}>
            <img src={chefImage} className={style.chefImage} alt=""/>
            <span className={style.chefName}>Massimo Bottura</span>
        </div>
      
    </div>
  )
}

export default Chefs
