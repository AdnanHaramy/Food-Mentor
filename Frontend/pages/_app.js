import "/styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/recipe-detaies/recommand-section/slider.css";
export default function App({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <Component {...pageProps} />
      </Provider>
   );
}
