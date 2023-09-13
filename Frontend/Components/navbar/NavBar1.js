import Image from "next/image";
import activeHome from "../../public/active-home.svg";
import Link from "next/link";
import style from "../../styles/navbar/navbar.module.css";
import axios from "axios";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
   logOutFailure,
   signInFailure,
   signUpFailure,
} from "../../redux/actions";

function NavBar1() {
   const dispatch = useDispatch();
   const isUserSignedUp = useSelector((state) => state.isUserSignedUp);
   const isUserSignedIn = useSelector((state) => state.isUserSignedIn);
   const isUserLoggedOut = useSelector((state) => state.isUserLoggedOut);

   async function logout() {
      const baseUrl = "http://127.0.0.1:8000";
      const res = axios.post(baseUrl + "/api/logout");
      const data = await (await res.then()).data;
      console.log(data.status);
      if (data.status === 1) {
         handleSuccess();
      } else {
         handleFailure();
      }
   }
   const handleSuccess = () => {
      // Perform actions for success case
      console.log("ok");
      dispatch(logOutFailure());
      dispatch(signInFailure());
      dispatch(signUpFailure());
   };

   const handleFailure = () => {
      // Perform actions for failure case
      console.log("error");
      dispatch(logOutFailure());
   };

   return (
      <div className={style.nav}>
         <div className={style.notactive}>
            <Link href="/">
               <div className={style.activeContainer}>
                  <Image
                     className={style.navsvg}
                     src={activeHome}
                     width={40}
                     height={40}
                     alt=""
                  />
               </div>
            </Link>
         </div>
         <div className={style.notactive}>
            <Link href="/favourites">
               <div
                  className={`${
                     isUserSignedUp || isUserSignedIn
                        ? style.navContainer
                        : style.none
                  }`}
               >
                  <Image
                     className={style.navsvg}
                     src="/heart.svg"
                     width={40}
                     height={40}
                     alt=""
                  />
               </div>
            </Link>
         </div>
         <div className={style.notactive}>
            <Link href="/Recipes">
               <div className={style.navContainer}>
                  <Image
                     className={style.navsvg}
                     src="/cooking-book-svgrepo-com.svg"
                     width={40}
                     height={40}
                     alt=""
                  />
               </div>
            </Link>
         </div>
         <div className={style.notactive}>
            <Link href="weeklyProgram">
               <div
                  className={`${
                     isUserSignedUp || isUserSignedIn
                        ? style.navContainer
                        : style.none
                  }`}
               >
                  <Image
                     className={style.navsvg}
                     src="/schedule-calendar-svgrepo-com.svg"
                     width={40}
                     height={40}
                     alt=""
                  />
               </div>
            </Link>
         </div>
         <div
            onClick={logout}
            className={`${
               isUserLoggedOut ? style.notLoggedOut : style.loggedOut
            }`}
         >
            <Image
               className={style.navsvg}
               src="/logout.svg"
               width={40}
               height={40}
               alt=""
            />
         </div>
      </div>
   );
}
export default NavBar1;
