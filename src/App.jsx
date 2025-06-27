import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div style={{ background: "#FFF" }}>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
