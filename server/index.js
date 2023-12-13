import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { getAllExercises } from "./src/controllers/exerciseController.js";
import {
  getUserByEmail,
  // getUserById,
  registerController,
  updateController,
} from "./src/controllers/usersController.js";
import {
  generateWorkoutPlan,
  saveWorkoutPlan,
} from "./src/controllers/workoutPlanController.js";
import {
  addWorkout,
  getAllWorkouts,
  getWorkoutByName,
} from "./src/controllers/workoutController.js";
import {
  saveWorkoutProgress,
  getWorkoutProgress,
} from "./src/controllers/workoutProgress.js";
const app = express();
const port = 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.blqpftv.mongodb.net/Flux?retryWrites=true&w=majority`;

// Routes
app.get("/api/exercises", getAllExercises);
app.post("/api/workouts", addWorkout);
app.post("/api/getWorkouts", getAllWorkouts);
// 
app.post("/api/register", registerController);
app.post("/api/update", updateController);
// 
app.get("/api/user/:email", getUserByEmail);
// app.get("/api/user/:id", getUserById);
// 
app.post("/api/workoutPlan", generateWorkoutPlan);
app.post("/api/user/:id/savePlan", saveWorkoutPlan);
app.post("/api/workout/progress", saveWorkoutProgress);
app.get("/api/getWorkoutProgress/:email", getWorkoutProgress);
app.get("/api/workouts/:name", getWorkoutByName);



// MongoDB connection
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("An error occurred while connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
