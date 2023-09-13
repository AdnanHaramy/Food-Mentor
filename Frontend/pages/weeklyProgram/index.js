import NavBar4 from "../../Components/navbar/NavBar4";
import Image from "next/image";
import Link from "next/link";
import style from "../../styles/weekly program/weeklyProgram.module.css";
import TopRecipesContainer from "../../Components/weekly program/TopRecipesContainer";
import WeeklyProgramContainer from "../../Components/weekly program/WeeklyProgramContainer";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProgramDone from "../../Components/weekly program/ProgramDone";

function weeklyProgram() {
   const today = new Date().getDay();
   const [recipeOfDay, setRecipeOfDay] = useState([]);
   const [recipes, setRecipes] = useState([]);
   const [topRecipes, setTopRecipes] = useState([]);
   const [recipeOfWeek, setRecipeOfWeek] = useState([]);
   const [newDay, setNewDay] = useState(0);
   const [program, setProgram] = useState([]);
   const [programIds, setProgramIds] = useState([]);
   const [programStatues, setProgramStatues] = useState([]);
   const [updateHappend, setUpdateHappend] = useState([]);
   const [doneUpdate, setDoneUpdate] = useState(0);
   const [programDone, setProgramDone] = useState("no");
   const [userType, setUserType] = useState("");
   const [userClaories, setUserCalories] = useState("");

   const router = useRouter();

   // ================== FETCH RECIPES FUNCTION =============================

   async function fetchData() {
      const response = await fetch(
         "http://127.0.0.1:8000/api/recipes/getAllRecipes"
      );
      const data = await response.json();
      setRecipes(data.data);
   }

   useEffect(() => {
      fetchData();
      setUserType(localStorage.getItem("userType"));
      setUserCalories(localStorage.getItem("caloriesShouldToEat"));
   }, []);

   // ================= GET PROGRAM FUNCTION ===========================
   async function getProgram() {
      let token = localStorage.getItem("token");
      const baseUrl = "http://127.0.0.1:8000";
      const res = axios.post(
         baseUrl + "/api/programs/getProgram",
         {},
         {
            headers: {
               Authorization: token,
            },
         }
      );
      const data = await (await res.then()).data.data.data;
      setProgram(data);
   }

   // ====================================================================

   // ================= UDATE PROGRAM FUNCTION ===========================

   async function updateProgram(statues, id) {
      let token = localStorage.getItem("token");
      const baseUrl = "http://127.0.0.1:8000";
      const res = axios.post(
         baseUrl + "/api/programs/updateProgram",
         {
            id: id,
            status: statues,
         },
         {
            headers: {
               Authorization: token,
            },
         }
      );
      const data = await await res.then();
      setDoneUpdate(!doneUpdate);
   }
   // ====================================================================

   // ================== GET USER PROGRAM =============================

   useEffect(() => {
      getProgram();
   }, [doneUpdate]);

   // ================== UPDATE USER PROGRAM ==========================

   useEffect(() => {
      if (updateHappend.length !== 0) {
         updateProgram(updateHappend[0], updateHappend[1]);
      }
   }, [updateHappend]);

   // =================================================================

   // ================== CREATE USER PROGRAM ==========================

   useEffect(() => {
      if (recipes.length !== 0 && program.length !== 0) {
         let recipesIds = [];
         program.map((el) => {
            recipesIds.push(el.recipe_id);
         });
         setRecipeOfWeek(createUserProgram(recipesIds));
      }
   }, [recipes, program]);

   // ================== RECIPES OF WEEK HANDLING =====================

   const createUserProgram = (recipesIds) => {
      let program = [];
      for (let i = 0; i < recipesIds.length; i++) {
         recipes.map((el) => {
            if (el.id === recipesIds[i]) {
               program.push(el);
            }
         });
      }
      return program;
   };

   // ===================================================================

   // ================== TOP RECIPES HANDLING =================

   useEffect(() => {
      // Top Recipes Handling

      if (recipes.length !== 0) {
         let top = topRecipesHandler();
         setTopRecipes(top);
      }
   }, [recipes]);

   const topRecipesHandler = () => {
      let top = recipes.filter((el) => {
         if (el.rating === "5") {
            return el;
         }
      });

      let topSix = [];
      for (let i = 0; i < 6; i++) {
         topSix.push(top[Math.floor(Math.random() * top.length)]);
      }
      return topSix;
   };

   // ===================================================================

   // ================== SLICE RECIPES WEEK =============================

   useEffect(() => {
      if (recipeOfWeek.length !== 0) {
         setRecipeOfDay(slicerecipes(recipeOfWeek));
      }
   }, [recipeOfWeek]);

   function slicerecipes(arr) {
      const result = [];
      for (let i = 0; i < arr.length; i += 3) {
         const subArray = [];
         for (let j = i; j < i + 3; j++) {
            if (j < arr.length) {
               subArray.push(arr[j]);
            }
         }
         result.push(subArray);
      }
      return result;
   }

   // ===================================================================

   //=========================== SLICE PROGRAM IDS =========================

   useEffect(() => {
      if (program.length !== 0) {
         // sliceProgramIds();
         setProgramIds(sliceProgramIds());
         setProgramStatues(sliceProgramStatues());
      }
   }, [program]);

   const sliceProgramIds = () => {
      const result = [];
      for (let i = 0; i < program.length; i += 3) {
         const helper = [];
         for (let j = i; j < i + 3; j++) {
            if (j < program.length) {
               helper.push(program[j].id);
            }
         }
         result.push(helper);
      }
      return result;
   };

   const sliceProgramStatues = () => {
      const result = [];
      for (let i = 0; i < program.length; i += 3) {
         const helper = [];
         for (let j = i; j < i + 3; j++) {
            if (j < program.length) {
               helper.push(program[j].status);
            }
         }
         result.push(helper);
      }
      return result;
   };

   //===================== Update User Program =================

   const isChecked = (check, programId) => {
      setUpdateHappend([check, programId]);
   };

   //============================================================

   //==================== New Program ============================

   useEffect(() => {
      const isProgramDone = programStatues.flat().includes(0);

      if (!isProgramDone) {
         setProgramDone("yes");
      } else {
         setProgramDone("no");
      }
   }, [programStatues]);

   //=============================================================

   //============== CALC THE CALORIES WITCH ARE ATE IN THIS WEEEK ==============

   const caloriesThisWeek = () => {
      let caloriesThisWeek = [];
      recipeOfWeek.map((el) => caloriesThisWeek.push(el.calories));

      let sum = 0;
      for (let i = 0; i < caloriesThisWeek.length; i++) {
         sum += +caloriesThisWeek[i];
      }
      return sum;
   };

   // Define an array of days of thisChecked

   const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];

   const days = [...daysOfWeek.slice(today), ...daysOfWeek.slice(0, today)];
   return (
      <div className={style.parent}>
         <NavBar4 />
         <div className={style.contnentContainer}>
            <div className={style.svgHolder}>
               <Image
                  className={style.coupleSvg}
                  src="/CoupleCook.svg"
                  height={280}
                  width={300}
                  alt=""
               />
               <h1 className={style.svgText}>
                  Keep up with Your Weekly Program <br /> to Achieve the Weight
                  You Desire!
               </h1>
            </div>
            <div className={style.program}>
               <div className={style.weeklyHeader}>
                  <h2>
                     Your Current Type is : <span>{userType}</span>
                  </h2>
                  <h2>
                     You should eat around <span>{parseInt(userClaories).toFixed(0)}</span> calories
                     per day.
                  </h2>
               </div>

               {programDone === "yes" ? null : (
                  <div className={style.dailyProgram}>
                     <button className={style.day} onClick={() => setNewDay(0)}>
                        {days[0]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(1)}>
                        {days[1]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(2)}>
                        {days[2]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(3)}>
                        {days[3]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(4)}>
                        {days[4]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(5)}>
                        {days[5]}
                     </button>
                     <button className={style.day} onClick={() => setNewDay(6)}>
                        {days[6]}
                     </button>
                  </div>
               )}

               {recipeOfDay.length === 0 ? (
                  <p className={style.loading}>Loading</p>
               ) : programDone === "yes" ? (
                  <ProgramDone caloriesThisWeek={caloriesThisWeek()} />
               ) : (
                  <div className={style.grid1}>
                     <WeeklyProgramContainer
                        recipe={recipeOfDay[newDay][0]}
                        type={"Breakfast"}
                        typeColor="#00ffff"
                        path={`/Recipes/${recipeOfDay[newDay][0].id}`}
                        isChecked={isChecked}
                        statues={programStatues[newDay][0]}
                        programId={programIds[newDay][0]}
                     />

                     <WeeklyProgramContainer
                        recipe={recipeOfDay[newDay][1]}
                        type={"Lunch"}
                        typeColor="#75e7a1"
                        path={`/Recipes/${recipeOfDay[newDay][1].id}`}
                        isChecked={isChecked}
                        statues={programStatues[newDay][1]}
                        programId={programIds[newDay][1]}
                     />

                     <WeeklyProgramContainer
                        recipe={recipeOfDay[newDay][2]}
                        type={"Dinner"}
                        typeColor="#ffa4c3"
                        path={`/Recipes/${recipeOfDay[newDay][2].id}`}
                        isChecked={isChecked}
                        statues={programStatues[newDay][2]}
                        programId={programIds[newDay][2]}
                     />
                  </div>
               )}
            </div>
         </div>
         <div className={style.RecipesOfTheWeek}>
            <h3 className={style.favouriteHeader}>Top Recipes this Week !</h3>

            {topRecipes.length === 0 ? (
               <p className={style.loading}>Loading</p>
            ) : (
               <Fragment>
                  <Link href={`/Recipes/${topRecipes[0].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[0]}
                        bkgColor="#E0ffdb"
                     />
                  </Link>
                  <Link href={`/Recipes/${topRecipes[1].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[1]}
                        bkgColor="#E9ffbb"
                     />
                  </Link>
                  <Link href={`/Recipes/${topRecipes[2].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[2]}
                        bkgColor="#D2ffb7"
                     />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipes[3].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[3]}
                        bkgColor="#Dbffe9"
                     />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipes[4].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[4]}
                        bkgColor="#Dbf2ff"
                     />
                  </Link>{" "}
                  <Link href={`/Recipes/${topRecipes[5].id}`}>
                     <TopRecipesContainer
                        recipe={topRecipes[5]}
                        bkgColor="#E2dbff"
                     />
                  </Link>
               </Fragment>
            )}
         </div>
      </div>
   );
}
export default weeklyProgram;
