import React from "react";
import style from "../../../../styles/recipe-detaies/card.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Directions = ({ recipe }) => {
   const [favoriteData, setFavoriteData] = useState([]);
   const [buttonText, setButtonText] = useState("Add to Favourites");
   const isUserSignedUp = useSelector((state) => state.isUserSignedUp);
   const isUserSignedIn = useSelector((state) => state.isUserSignedIn);
   const isUserLoggedOut = useSelector((state) => state.isUserLoggedOut);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const baseUrl = "http://127.0.0.1:8000";
      let token = localStorage.getItem("token");

      const res = await axios.post(
         baseUrl + "/api/users/getFavorite",
         {},
         {
            headers: {
               Authorization: token,
            },
         }
      );

      const data = res.data.data.data;
      const isRecipeInFavorites = data.some(
         (favorite) => favorite.id === recipe.id
      );
      if (isRecipeInFavorites) {
         setButtonText("Remove from Favourites");
      } else {
         setButtonText("Add to Favourites");
      }
   };

   async function handleClick() {
      const baseUrl = "http://127.0.0.1:8000";
      let token = localStorage.getItem("token");

      if (buttonText === "Remove from Favourites") {
         const res = await axios.post(
            baseUrl + "/api/users/deleteFavorite",
            {
               recipe_id: recipe.id,
            },
            {
               headers: {
                  Authorization: token,
               },
            }
         );
         const data = res.data;
      } else {
         const res = await axios.post(
            baseUrl + "/api/users/addFavorite",
            {
               recipe_id: recipe.id,
            },
            {
               headers: {
                  Authorization: token,
               },
            }
         );
         const data = res.data;
      }

      fetchData();
   }
   const directions = recipe.preparing;
   const direction = directions.split("$");
   const directionElement = direction.map((el, index) => {
      return (
         <span key={index}>
            {el}
            <br></br>
         </span>
      );
   });

   return (
      <div className={style.directions}>
         <h3>Directions : </h3>
         <p>{directionElement}</p>
         <button
            id="favoriteButton"
            onClick={handleClick}
            style={isUserSignedIn ? {} : { display: "none" }}
         >
            {buttonText}
         </button>
      </div>
   );
};

export default Directions;
