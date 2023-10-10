import Users from "../models/usersModel.js";
// In your usersController.js

export const createUser = async (req, res) => {
  const { body } = req;
  // console.log(body.formData);
  console.log(body._id);
  console.log(typeof body._id);
  // Map req.body to the shape that Mongoose expects
  const mappedBody = {
    _id: body._id,
    email: body.email | "",
    name: body.formData["What is your name?"],
    age: Number(body.formData["How old are you?"]),
    fitnessLevel: body.formData["What is Your fitness level"],
    goal: body.formData["Choose your goal"], // This is a string in formData but an array in the model. Decide which one is correct.
    preferredWorkouts: body.formData["What is your preferred workouts?"],
    days: Number(body.formData["How many days should the workout plan cover"]),
  };

  console.log(mappedBody);
  const newUser = new Users(mappedBody);
  try {
    const savedUser = await newUser.save();
    res.json({ savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id; // Or whatever you name the parameter in your route

  try {
    const Users = await Users.findById(userId);
    if (!Users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(Users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const registerController = async (req, res) => {
  const { _id, email, formData } = req.body;
  console.log('register back')
  // Check if Users exists
  const existingUser = await Users.findById(_id);
  if (existingUser) {
    return res.status(409).json({ message: "Users already exists" });
  }

  // Create a new Users
  const newUser = new Users({
    _id,
    email,
    formData,
  });

  await newUser.save();

  return res.status(201).json(newUser);
};

export const updateController = async (req, res) => {
  const { _id, formData ,email } = req.body;
  console.log('update back');
  console.log(`Updating user with _id: ${_id}`);
  console.log(email)
  try {
    // Find Users and update
    const updatedUser = await Users.findByIdAndUpdate(
      _id,
      { $set: { formData: formData, email: email } }, // Explicitly use $set operator
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(`User updated: ${JSON.stringify(updatedUser)}`);
    return res.status(200).json(updatedUser);

  } catch (err) {
    console.error(`An error occurred while updating: ${err}`);
    return res.status(500).json({ message: "An error occurred during update", error: err });
  }
};
