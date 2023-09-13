import React from "react";
import Image from "next/image";
import style from "../../styles/home/landing.module.css";
import vactorLanding from "../../public/landing-page/landing-vector.png";
import Link from "next/link";

const Landing = () => {
   return (
      <div className={style.mainLanding}>
         <div className={style.landing}>
            <div className={style.container}>
               <div className={style.text}>
                  <h1>Eat Healthy</h1>
                  <h1>Every Day</h1>
                  <p>
                     Get inspired by our nutritious flavour-packed recipes
                     including vegetarian, vegan and meat options.
                  </p>
                  <p>We Provide You With A Diet Tailored To Your Needs.</p>
               </div>
               <div className={style.image}>
                  <Image
                     src={vactorLanding}
                     alt=""
                     className={style.landingImage}
                  />
               </div>
            </div>
         </div>
         <Link href={"/login"} className={style.getStartedLink}>
            <div className={style.getStarted}>Get Started</div>
         </Link>
      </div>
   );
};

export default Landing;
