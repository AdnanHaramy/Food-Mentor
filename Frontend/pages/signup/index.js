import React, { Fragment, useRef, useState } from "react";
import PopUp from "../../Components/pop up/PopUp";
import Image from "next/image";
import style from "../../styles/signup/sign-up.module.css";
import wave from "../../public/sign up/wave.svg";
import vector from "../../public/sign up/vector.png";
import eyePassword from "../../public/sign up/eye-password.svg";
import ErrorPassword from "../../Components/pop up/errorPassword";

const SignUpPage = () => {
   //show password Logic

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [show, setShow] = useState(false);
   const [userStatues, setUserStatues] = useState("");
   const [error, setError] = useState(false);
   const passwordRef = useRef(null);

   const firstNameHandler = (e) => {
      setFirstName(e.target.value);
   };
   const lastNameHandler = (e) => {
      setLastName(e.target.value);
   };

   const emailHandler = (e) => {
      setEmail(e.target.value);
   };
   const passwordHandler = (e) => {
      setPassword(e.target.value);
   };
   const confirmPasswordHandler = (e) => {
      setConfirmPassword(e.target.value);
   };

   const showPassword = () => {
      setShow(!show);
   };

   const continueProfile = () => {
      if (password === confirmPassword) {
         setUserStatues("user logged in successfully");
      } else setError(true);
   };

   const fixingError = () => {
      setError(false);
      setPassword("");
      setConfirmPassword("");
      passwordRef.current.focus();
   };

   return (
      <Fragment>
         {userStatues === "user logged in successfully" && (
            <PopUp
               firstName={firstName}
               lastName={lastName}
               email={email}
               password={password}
               confirmPassword={confirmPassword}
            />
         )}
         {error && (
            <ErrorPassword
               fixError={fixingError}
               text="We're sorry, but the password you entered does not match the confirm
         password."
            />
         )}
         <div
            className={
               userStatues === "user logged in successfully" || error
                  ? `${style.signUp} ${style.logged}`
                  : style.signUp
            }
         >
            <div className={style.imageContanier}>
               <Image src={wave} className={style.wave} alt="" />
            </div>

            <div className={style.container}>
               <div className={style.imageSide}>
                  <div className={style.text}>
                     <h2>Welcome To Us !</h2>
                     <p>Start Your Healthy Life</p>
                  </div>
                  <Image src={vector} width={450} alt="" />
               </div>
               <div className={style.formSide}>
                  <h2>Sign Up</h2>
                  <form>
                     <label htmlFor="first">First Name</label>
                     <input
                        type="text"
                        id="first"
                        placeholder="Enter Your First Name"
                        required
                        value={firstName}
                        onChange={firstNameHandler}
                     />

                     <label htmlFor="last">Last Name</label>
                     <input
                        type="text"
                        id="last"
                        placeholder="Enter Your Last Name"
                        required
                        value={lastName}
                        onChange={lastNameHandler}
                     />

                     <label htmlFor="email">E-mail</label>
                     <input
                        type="email"
                        id="email"
                        placeholder="Your E-mail @gmail.com"
                        required
                        value={email}
                        onChange={emailHandler}
                     />

                     <label htmlFor="password">Password</label>
                     <div className={style.passWord}>
                        <input
                           type={show ? "text" : "password"}
                           id="password"
                           placeholder="Enter Your Pasword"
                           required
                           value={password}
                           onChange={passwordHandler}
                           ref={passwordRef}
                        />
                        <i className={style.showPassword}>
                           <Image
                              src={eyePassword}
                              width={16}
                              onClick={showPassword}
                              alt=""
                           />
                        </i>
                     </div>

                     <label htmlFor="confpassword">Confirm Password</label>

                     <div className={style.passWord}>
                        <input
                           type={show ? "text" : "password"}
                           id="confpassword"
                           placeholder="Confirm Pasword"
                           required
                           value={confirmPassword}
                           onChange={confirmPasswordHandler}
                        />
                        <i className={style.showPassword}>
                           <Image
                              src={eyePassword}
                              width={16}
                              onClick={showPassword}
                              alt=""
                           />
                        </i>
                     </div>
                     <button type="button" onClick={continueProfile}>
                        Sign Up
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default SignUpPage;

// <div className={style.container}>
// <div className={style.imageSide}></div>
// <div className={style.formSide}></div>
// </div>
