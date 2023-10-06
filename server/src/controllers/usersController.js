import User from "../models/usersModel.js";
// In your usersController.js
export const createUser = async (req, res) => {
  const { body } = req;
  console.log(body["How many days should the workout plan cove"]);

 

  // Map req.body to the shape that Mongoose expects
  const mappedBody = {
    name: body["What is your name?"],
    age: Number(body["How old are you?"]), // make sure to convert to Number
    fitnessLevel: body["What is Your fitness level"],
    goal:body["Choose your goal"],
    preferredWorkouts: body["What is your preferred workouts?"],
    days: Number(body["How many days should the workout plan cove"]), // make sure to convert to Number
  };
console.log(mappedBody)
  const newUser = new User(mappedBody);

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
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
