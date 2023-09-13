import React from 'react'
import style from "../card.module.css";
import RecipeImage from './RecipeImage';
import ViweType from './viwe-type/ViweType';
import RecipeUnit from './recipeUnits/RecipeUnit';
import Chefs from './Chefs';


const Detailes = () => {
    
    return (
        <div className={style.detailes}>  
            <RecipeImage />
            <ViweType />
            <RecipeUnit />
            <Chefs />
        </div>
    )
}

export default Detailes
