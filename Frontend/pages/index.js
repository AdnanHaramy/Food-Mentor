// import style from "../styles/home/home.module.css";
import Feature from "../Components/home/Feature";
import LandingAbout from "../Components/home/LandingAbout";
import Landing from "../Components/home/Landing";
import NavBar1 from "../Components/navbar/NavBar1";
// import Landing from "./landing/Landing";
// import Feature from "./features/Feature";
// import LandingAbout from "./landing-about/LandingAbout";

const index = () => {
   return (
      <div style={{ display: "flex" }}>
         <NavBar1 />
         <div className="landingPage">
            <Landing />
            <Feature />
            <LandingAbout />
         </div>
      </div>
   );
};

export default index;
