import React, { Fragment } from "react";
import Image from "next/image";
import style from "../../../../styles/recipe-detaies/card.module.css";

import starIcon from "../../../../public/star-icon.svg";
import halfStarIcon from "../../../../public/half-star-icon.svg";

const RatingRecipe = ({ rating }) => {
   let realRating = rating;
   let intRating = Number.parseInt(realRating);
   if (intRating > 5) {
      intRating = 5;
      realRating = 5;
   }

   let ratingvalue = 0;

   switch (true) {
      case realRating - intRating < 0.5:
         ratingvalue = intRating;
         break;
      case realRating - intRating > 0.5:
         ratingvalue = intRating + 1;
         break;
      case realRating - intRating === 0.5:
         ratingvalue = realRating;
         break;
      default:
         ratingvalue = intRating;
   }

   const fullStar = () => {
      let starArray = [];
      for (let i = 1; i <= ratingvalue; i++) {
         starArray.push(
            <Image
               src={starIcon}
               alt=""
               className={style.starIcon}
               width={20}
               height={20}
               key={i}
            />
         );
      }
      return starArray;
   };
   const halfStar = () => {
      let starArray = [];
      for (let i = 1; i <= ratingvalue; i++) {
         starArray.push(
            <Image
               src={starIcon}
               alt=""
               className={style.starIcon}
               width={20}
               height={20}
            />
         );
      }
      starArray.push(
         <Image
            src={halfStarIcon}
            alt=""
            className={style.starIcon}
            width={20}
            height={20}
         />
      );
      return starArray;
   };

   return (
      <Fragment>
         {Number.isInteger(ratingvalue) ? fullStar() : halfStar()}
      </Fragment>
   );
};

export default RatingRecipe;
