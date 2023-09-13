import React, { Fragment, useRef } from "react";
import style from "../../styles/login/LoginPage.module.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import googleLogo from "../../public/google.png";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
   signInSuccess,
   signInFailure,
   logOutSuccess,
   logOutFailure,
} from "../../redux/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPassword from "../pop up/errorPassword";
const FormSide = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(false);
   const emailRef = useRef(null);

   const emailHandler = (e) => {
      setEmail(e.target.value);
   };
   const passwordHandler = (e) => {
      setPassword(e.target.value);
   };

   async function signin() {
      try {
         const baseUrl = "http://127.0.0.1:8000";
         const res = axios.post(baseUrl + "/api/login", {
            email: email,
            password: password,
         });
         const data = await (await res.then()).data;
         if (data.status === 1) {
            handleSuccess();
            let token = data.access_token;
            localStorage.setItem("token", "Bearer " + token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
         } else {
            handleFailure();
         }
      } catch {
         console.log("Error Happend");
         setError(true);
      }
   }
   const handleSuccess = () => {
      console.log("ok");
      dispatch(signInSuccess());
      dispatch(logOutSuccess());
      router.push("/");
      // Perform actions for success case
   };
   const handleFailure = () => {
      console.log("error");
      dispatch(signInFailure());
      // Perform actions for failure case
   };

   const fixingError = () => {
      setError(false);
      setEmail("");
      setPassword("");
      emailRef.current.focus();
   };

   return (
      <Fragment>
         {error && (
            <ErrorPassword
               fixError={fixingError}
               text="We're sorry, but it looks like there are errors in your email or password , please check your data and enter again."
            />
         )}

         <div className={style.formSide}>
            <div className={style.login}>
               <div className={style.header}>
                  <Image
                     src={logo}
                     alt=""
                     className={style.logo}
                     width={70}
                     height={70}
                  />
                  <h2>Hello ! Welcome Back</h2>
               </div>
               <form>
                  <div className={style.form}>
                     <label>E-mail</label>
                     <input
                        type="email"
                        placeholder="Enter Your E-mail"
                        required
                        value={email}
                        onChange={emailHandler}
                        ref={emailRef}
                     />
                     <label>Password</label>

                     <input
                        type="password"
                        placeholder="Enter Your Password"
                        required
                        value={password}
                        onChange={passwordHandler}
                     />
                     <button onClick={signin} type="button">
                        Login
                     </button>
                  </div>
                  <span>OR</span>
               </form>
               <div className={style.newAccount}>
                  Don´t Have An Account ?<Link href={"signup"}>Sign Up</Link>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default FormSide;
