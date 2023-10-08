import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  age: Number,
  fitnessLevel: String,
  goal: [String],
  preferredWorkouts: [String],
  days: Number,
});

const Users = mongoose.model("Users", UsersSchema, "users");
export default Users;
  