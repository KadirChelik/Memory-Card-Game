import SinglePlayerGame from "./components/SinglePlayerGame";
import MultiPlayerGame from "./components/MultiPlayerGame";
import MainMenu from "./components/MainMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {Routes, Route,useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";


function App() {

  const location = useLocation();
  return (
    <>
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route index element={<MainMenu />} />
      <Route path="/SinglePlayerGame" element={<SinglePlayerGame />} />
      <Route path="/MultiPlayerGame" element={<MultiPlayerGame />} />      
    </Routes>
    </AnimatePresence>
    </>
  );
}

export default App;
