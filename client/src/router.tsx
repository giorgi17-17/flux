import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import Meales from "./pages/Meales";
import Questions from "./pages/Questions";


const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/workouts" element={<Workouts />}/>
        <Route path="/meals" element={<Meales />}/>
        <Route path="/questions" element={<Questions />}/>

    </Routes>
  )
}

export default Router