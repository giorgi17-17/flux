import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: String,
    target: String,
    bodyPart: String,
    equipment: String,
    videoUrl: String,
    imageUrl: String,
    secondaryMuscles: [String],
    difficultyLevel: String,
    duration: String,
    caloriesBurnt: String,
    instructions: [String],
    tips: [String],
    tags: [String],
  },
  { collection: "workouts" }
);

const Workout = mongoose.model("Workouts", workoutSchema, "workouts");

export default Workout;
