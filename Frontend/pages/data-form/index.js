import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/data-form/dataForm.module.css";
import FatPercent from "../../Components/data-form/FatPercent";
import essentialFat from "../../public/fat percentage/Essential Fat.png";
import athletes from "../../public/fat percentage/Athletes.png";
import fitness from "../../public/fat percentage/Fitness.png";
import acceptable from "../../public/fat percentage/Acceptable.png";
import obese from "../../public/fat percentage/Obese.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
   signUpSuccess,
   signUpFailure,
   logOutSuccess,
   signInSuccess,
   signInFailure,
} from "../../redux/actions";
import { useRouter } from "next/router";

const DataForm = () => {
   const [typeFat, setTypeFat] = useState("");
   const [recipes, setRecipes] = useState([]);
   const [recipesIds, setRecipesIds] = useState([]);
   const [signupSuccessfuly, setSignupSuccessfuly] = useState(false);
   const weightRef = useRef();
   const heightRef = useRef();
   const genderRef = useRef();
   const veganRef = useRef();
   const ageRef = useRef();
   const dailyActivityRef = useRef();
   const dispatch = useDispatch();
   const route = useRouter();
   const [userType, setUserType] = useState("");

   // get Fat Type and set the Type in the "type Fat" State

   const fatTypeHandler = (e) => {
      const targetElement = e.target.id;
      if (targetElement === "img-type") {
         setTypeFat(e.target.parentElement.children[1].innerHTML);
      } else if (targetElement === "type") {
         setTypeFat(e.target.innerHTML);
      } else if (targetElement === "parent-type") {
         setTypeFat(e.target.children[1].innerHTML);
      }
   };

   // -------------------------------------

   // check if gender is Female or not

   const isFemale = () => {
      return genderRef.current.id === "female" && genderRef.current.checked
         ? true
         : false;
   };

   //check if user is Vegan or not

   const isVegan = () => {
      return veganRef.current.id === "not-veganId" && veganRef.current.checked
         ? false
         : true;
   };

   // set the Lean Factor for the current Fat type

   const leanFactor = () => {
      let leanFactorValue;
      switch (typeFat) {
         case "Essential Fat":
            leanFactorValue = 1.0;
            break;
         case "Athletes":
            leanFactorValue = 0.95;
            break;
         case "Fitness":
            leanFactorValue = 0.9;
            break;
         case "Acceptable":
            leanFactorValue = 0.85;
            break;
         case "Obes":
            leanFactorValue = 0.78;
            break;
         default:
            leanFactorValue = 0.8;
      }
      return leanFactorValue;
   };

   //set Calories value
   const caloriesEquation = () => {
      // Global Form
      // calories = Weight * 0.9 (female) | * 1 (male) * 24 * lean Factor ==> BMR (Basal Metabolic Rate)
      // calories = BMR * Activity Modifier

      let genderFactor = isFemale() ? 0.9 : 1.0;
      const bmr = weightRef.current.value * genderFactor * 24 * leanFactor();
      const calories = bmr * dailyActivityRef.current.value;

      return calories;
   };

   //Lose Or Gain Weight Handling

   const loseOrGainWeight = () => {
      const height = Math.pow(heightRef.current.value / 100, 2);
      const bmi = weightRef.current.value / height;
      let caloriesShouldToEat = caloriesEquation();

      switch (true) {
         case bmi <= 16.5:
            setUserType("So Under Weight");
            caloriesShouldToEat = caloriesShouldToEat + 800;
            break;
         case bmi > 16.5 && bmi <= 18.5:
            setUserType("Under Weight");
            caloriesShouldToEat = caloriesShouldToEat + 500;
            break;
         case bmi > 18.5 && bmi <= 24.9:
            setUserType("Healthy Weight");
            caloriesShouldToEat = caloriesShouldToEat;
            break;
         case bmi > 25 && bmi <= 29.9:
            setUserType("Over weight");
            caloriesShouldToEat = caloriesShouldToEat - 450;
            break;
         case bmi > 30:
            setUserType("Obese");
            caloriesShouldToEat = caloriesShouldToEat - 650;
            break;
         default:
            caloriesShouldToEat = caloriesShouldToEat;
      }
      return caloriesShouldToEat;
   };

   const submitHandler = (e) => {
      e.preventDefault();

      console.log("calories i burn ", caloriesEquation());
      //calories Should to Eat
      // if want to Lose Weight :  calories - 450
      // if Want to get Weight  : start with => calories + 500
      console.log("calories should to eat :", loseOrGainWeight());

      localStorage.setItem("caloriesEquation", caloriesEquation());
      localStorage.setItem("caloriesShouldToEat", loseOrGainWeight());

      localStorage.setItem("weight", weightRef.current.value);
      let token = localStorage.getItem("token");
      if (token) {
         setSignupSuccessfuly(true);
      } else {
         signup();
      }
   };

   async function signup() {
      const baseUrl = "http://127.0.0.1:8000";
      const res = axios.post(baseUrl + "/api/register", {
         email: route.query.email,
         password: route.query.password,
         first_name: route.query.firstName,
         last_name: route.query.lastName,
         c_password: route.query.confirmPassword,
         age: ageRef.current.value,
         weight: weightRef.current.value,
         height: heightRef.current.value,
         gender: isFemale() ? "female" : "male",
         vegan: isVegan(),
         activity: dailyActivityRef.current.value,
         fatPercent: leanFactor(),
      });
      const data = await (await res.then()).data;

      // ---------------------------------------
      if (data.message === "user logged in successfully") {
         handleSuccess();
         let token = data.access_token;
         localStorage.setItem("token", "Bearer " + token);
         axios.defaults.headers.common["Authorization"] = "Bearer " + token;
         setSignupSuccessfuly(true);
      } else {
         handleFailure();
      }
   }

   const handleSuccess = () => {
      console.log("ok");
      dispatch(signInSuccess());
      dispatch(signUpSuccess());
      dispatch(logOutSuccess());

      // Perform actions for success case
   };
   const handleFailure = () => {
      console.log("error");
      dispatch(signUpFailure());
      dispatch(logOutFailure());
      // Perform actions for failure case
   };

   // -------------------------------------------------

   async function fetchData() {
      const response = await fetch(
         "http://127.0.0.1:8000/api/recipes/getAllRecipes"
      );
      const data = await response.json();
      setRecipes(data.data);
   }
   useEffect(() => {
      fetchData();
   }, []);

   // ---------------------------------------------------------

   useEffect(() => {
      if (recipes.length !== 0 && signupSuccessfuly) {
         const caloriesShouldToEat = loseOrGainWeight();
         const isVgan = isVegan();

         // calories range

         const highCaloriesShouldToEat = caloriesShouldToEat * 1;
         const lowCaloriesShouldToEat =
            caloriesShouldToEat - caloriesShouldToEat * (isVgan ? 0.4 : 0.3);

         console.log("caloriesShouldToEat", caloriesShouldToEat);
         console.log("highCaloriesShouldToEat", highCaloriesShouldToEat);
         console.log("lowCaloriesShouldToEat", lowCaloriesShouldToEat);

         // --------------------------------------------------------------------------------------------------

         //recommendation for one Week

         // filtering vegan recipes

         let recommandedRecipes = recipes.filter((el) => {
            if (isVgan === "true") {
               return el.vegan;
            } else return el;
         });

         let caloriesPerDay = 0;
         let counter = 0;

         recommandedRecipes = recommandedRecipes.filter((el, index) => {
            if (
               lowCaloriesShouldToEat / 3 < el.calories &&
               el.calories < highCaloriesShouldToEat / 3
            ) {
               if (counter < 3) {
                  caloriesPerDay += +el.calories;
                  counter++;
                  return el;
               } else return el;
            }
         });

         if (recommandedRecipes.length < 21) {
            let i = 21 - recommandedRecipes.length;
            let counter = 0;
            while (counter < i) {
               recommandedRecipes.push(
                  recommandedRecipes[
                     Math.floor(Math.random() * recommandedRecipes.length)
                  ]
               );
               counter++;
            }
         } else {
            recommandedRecipes = recommandedRecipes.slice(0, 21);
         }

         let ids = [];
         recommandedRecipes.map((el) => {
            return ids.push(el.id);
         });

         setRecipesIds(ids);
         // --------------------------------------------------------------------------------------------------
      }
   }, [recipes, signupSuccessfuly]);

   useEffect(() => {
      if (recipesIds.length === 21) {
         async function fillProgram() {
            let token = localStorage.getItem("token");
            const baseUrl = "http://127.0.0.1:8000";
            const res = axios.post(
               baseUrl + "/api/programs/fillProgram",
               {
                  ids: recipesIds,
               },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            const data = await await res.then();

            if (data.status === 200) {
               route.push({
                  pathname: "/weeklyProgram",
               });
            }
         }
         fillProgram();
         localStorage.setItem("userType", userType);
      }
   }, [recipesIds]);

   // ------------------------------------------------------------------
   return (
      <div className={style.formPage}>
         <div className={style.box}>
            <form onSubmit={submitHandler}>
               <div className={style.container}>
                  <div className={style.leftTop}>
                     <div className={style.Weight}>
                        <label htmlFor="weight">Weight</label>
                        <input
                           type="number"
                           id="weight"
                           placeholder="Enter Your Weight (kg)"
                           required
                           name="weight"
                           min={25}
                           max={300}
                           ref={weightRef}
                        />
                     </div>

                     <div className={style.height}>
                        <label htmlFor="height">Height</label>
                        <input
                           type="number"
                           id="height"
                           placeholder="Enter Your Height (Cm)"
                           required
                           name="height"
                           min={130}
                           max={255}
                           ref={heightRef}
                        />
                     </div>

                     <div className={style.old}>
                        <label htmlFor="old">Age</label>
                        <input
                           type="number"
                           id="old"
                           placeholder="Enter Your Old (Year)"
                           required
                           name="old"
                           min={18}
                           max={90}
                           ref={ageRef}
                        />
                     </div>

                     <div className={style.leftBottom}>
                        <div className={style.dailyActivity}>
                           <label>Determain Your Daily Activity</label>
                           <select className="slection" ref={dailyActivityRef}>
                              <option value={1.3}>Very Light </option>
                              <option value={1.55}>Light</option>
                              <option value={1.65}>Moderate </option>
                              <option value={1.8}>Heavy</option>
                              <option value={2}>Very Heavy</option>
                           </select>
                        </div>

                        <div className={style.gender}>
                           <label>Gender :</label>
                           <div className="form-check">
                              <input
                                 type="radio"
                                 required
                                 name="gender"
                                 id="male"
                                 value="male"
                                 ref={genderRef}
                              />
                              <label htmlFor="male"> Male </label>
                           </div>

                           <div className="form-check">
                              <input
                                 type="radio"
                                 name="gender"
                                 id="female"
                                 value="female"
                                 ref={genderRef}
                              />
                              <label htmlFor="female"> Female</label>
                           </div>
                        </div>

                        <div className={style.vegan}>
                           <label>Vegan ?</label>

                           <div className="form-check">
                              <input
                                 type="radio"
                                 name="vegan"
                                 id="veganId"
                                 required
                                 value="yes"
                                 ref={veganRef}
                              />
                              <label htmlFor="veganId"> Yes </label>
                           </div>

                           <div className="form-check">
                              <input
                                 type="radio"
                                 name="vegan"
                                 id="not-veganId"
                                 value="no"
                                 ref={veganRef}
                              />
                              <label htmlFor="not-veganId"> No </label>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={style.fatMeasure}>
                     <h4>Determain Your Fat</h4>

                     <div className={style.fatDetermain}>
                        <input
                           type="text"
                           placeholder="Your Fat"
                           readOnly
                           value={typeFat}
                        ></input>

                        <div className={style.choosingContainer}>
                           <FatPercent
                              styling={"#0d95f8"}
                              image={essentialFat}
                              type="Essential Fat"
                              clicked={fatTypeHandler}
                           />
                           <FatPercent
                              styling={"#6ad69a"}
                              image={athletes}
                              type="Athletes"
                              clicked={fatTypeHandler}
                           />
                           <FatPercent
                              styling={"#f6e700"}
                              image={fitness}
                              type="Fitness"
                              clicked={fatTypeHandler}
                           />
                           <FatPercent
                              styling={"#ff7800"}
                              image={acceptable}
                              type="Acceptable"
                              clicked={fatTypeHandler}
                           />
                           <FatPercent
                              styling={"#ff0000"}
                              image={obese}
                              type="Obes"
                              clicked={fatTypeHandler}
                           />
                        </div>
                     </div>

                     <button type="submit">Submit</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default DataForm;
