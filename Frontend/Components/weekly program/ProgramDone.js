import React, { useEffect, useState } from "react";
import style from "../../styles/weekly program/weeklyProgram.module.css";
import Link from "next/link";

const ProgramDone = ({ caloriesThisWeek }) => {
   const [currentWeight, setcurrentWeight] = useState();

   const expectedWeight = (weight, caloriesIburn) => {
      let totalCaloriesExpended = +caloriesIburn * 7;
      let calorieSurplus = caloriesThisWeek - totalCaloriesExpended;
      let kilogramsGained = calorieSurplus / 7700;
      let currentWeight = +weight + kilogramsGained;
      return currentWeight.toFixed(3);
   };

   useEffect(() => {
      let weight = localStorage.getItem("weight");
      let caloriesIburn = localStorage.getItem("caloriesEquation");
      setcurrentWeight(expectedWeight(weight, caloriesIburn));
   });

   return (
      <div className={style.programdone}>
         <p>
            This weekly program is over, you have achieved the desired target,
            we think you have consumed {caloriesThisWeek} calories over the past
            week, and your expected weight is {currentWeight} kilos, please
            re-enter your new data to proceed with the next weekly program
         </p>
         <Link href={"/data-form"}>
            <button>Enter new Data</button>
         </Link>
      </div>
   );
};

export default ProgramDone;
