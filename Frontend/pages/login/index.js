import React from "react";
import style from "../../styles/login/LoginPage.module.css";
import FormSide from "../../Components/login/FormSide";

const LoginPage = () => {
   return (
      <div className={style.container}>
         <div className={style.card}>
            <div className={style.photoSide}>
               <div className={style.backgroundImage}></div>
            </div>
            <FormSide />
         </div>
      </div>
   );
};

export default LoginPage;
