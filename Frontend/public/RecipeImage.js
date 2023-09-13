import React from 'react'
import style from "../card.module.css";
import recipeImage from "../../../../image/recipe.png";

const RecipeImage = () => {

    return (
        <div className={style.imgContainer}>
            <img src= {recipeImage} alt='' className={style.recipeImage}/>
        </div>
    )
}

export default RecipeImage
