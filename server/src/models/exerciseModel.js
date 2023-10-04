import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  bodyPart: String,
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
  secondaryMuscles: [String], 
  instructions: [String],
}, { collection : 'exercises' });

const Exercise = mongoose.model("Exercises", exerciseSchema, "exercises");

export default Exercise;
