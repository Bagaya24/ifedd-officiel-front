import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "./router/Router";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
   <Router/>
    </HelmetProvider>
  )
}

export default App
