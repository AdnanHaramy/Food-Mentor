import React from "react";
import style from "../../styles/pop up/popUp.module.css";
import Link from "next/link";

const PopUp = ({ firstName, lastName, email, password, confirmPassword }) => {
   return (
      <div className={style.popUp}>
         <div className={style.container}>
            <div className={style.text}>
               <p>You logged in successfully</p>
               <p>
                  Pleas provide us with some Information in order help you get
                  healthy Life and for Register you correctly{" "}
               </p>
            </div>
            <Link
               href={{
                  pathname: "/data-form",
                  query: {
                     firstName,
                     lastName,
                     email,
                     password,
                     confirmPassword,
                  },
               }}
               className={style.goToForm}
            >
               Let´s Started
            </Link>
         </div>
      </div>
   );
};

export default PopUp;
