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
import UserProfile from "./pages/UserProfile";
import Pricing from "./pages/Pricing";

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
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};

export default Router;
