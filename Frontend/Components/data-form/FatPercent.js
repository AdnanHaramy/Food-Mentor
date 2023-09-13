import React from "react";
import Image from "next/image";
import style from "../../styles/data-form/dataForm.module.css";

const FatPercent = ({ image, type, clicked, styling }) => {
   return (
      <div
         className={style.fatPercent}
         style={{
            backgroundImage: `linear-gradient(to left , ${styling} -60% ,white )`,
         }}
         id="parent-type"
         onClick={clicked}
      >
         <Image src={image} alt="" id="img-type" width={24} />
         <div id="type">{type}</div>
      </div>
   );
};

export default FatPercent;

// linear-gradient
