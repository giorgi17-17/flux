import User from "../models/usersModel.js";
// In your usersController.js
import uniqid from "uniqid";

export const createUser = async (req, res) => {
  const { body } = req;
  console.log(body);
  const id = uniqid();
  // Map req.body to the shape that Mongoose expects
  const mappedBody = {
    _id: id,
    name: body["What is your name?"],
    age: Number(body["How old are you?"]),
    fitnessLevel: body["What is Your fitness level"],
    goal: body["Choose your goal"],
    preferredWorkouts: body["What is your preferred workouts?"],
    days: Number(body["How many days should the workout plan cove"]),
  };
  console.log(mappedBody);
  const newUser = new User(mappedBody);
  try {
    const savedUser = await newUser.save();
    res.json({ id, savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};
