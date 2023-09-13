import React from "react";
import style from "../../styles/pop up/popUp.module.css";

const ErrorPassword = ({ fixError, text }) => {
   const clickHandling = () => {
      fixError();
   };
   return (
      <div className={style.passwordErroe}>
         {text}
         <button onClick={clickHandling}>Enter again</button>
      </div>
   );
};

export default ErrorPassword;
