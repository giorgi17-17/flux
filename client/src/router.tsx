import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import Meales from "./pages/Meales";
import Questions from "./pages/Questions";
import Plan from "./pages/Plan";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Workout from "./pages/Workout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/meals" element={<Meales />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/workout" element={<Workout />} />
    </Routes>
  );
};

export default Router;
