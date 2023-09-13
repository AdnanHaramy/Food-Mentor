import React from "react";
import Image from "next/image";
import style from "../styles/404Error-page.module.css";
import errorImage from "../public/404-error-code-banner-isolated-cartoon-people-vector-27257302.jpg";

const index = () => {
   return (
      <div className={style.body}>
         <div className={style.container}>
            <Image src={errorImage} alt="" className={style.errorImage} />
            <p className={style.text}>
               <span>404</span> This page could not be found
            </p>
         </div>
      </div>
   );
};

export default index;
