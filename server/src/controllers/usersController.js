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
  const newUser = new User(mappedBody);
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
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id; // Or whatever you name the parameter in your route

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerOrUpdate = async (req, res) => {
  const { _id, email, formData } = req.body;

  // Map req.body to the shape that Mongoose expects
  const mappedBody = {
    _id: _id,
    email: email || "",
    name: formData ? formData["What is your name?"] : undefined,
    age: formData ? Number(formData["How old are you?"]) : undefined,
    fitnessLevel: formData ? formData["What is Your fitness level"] : undefined,
    goal: formData ? formData["Choose your goal"] : undefined,
    preferredWorkouts: formData ? formData["What is your preferred workouts?"] : undefined,
    days: formData ? Number(formData["How many days should the workout plan cover"]) : undefined,
  };

  try {
    let existingUser = await Users.findById(_id);

    if (existingUser) {
      // Update only if email is present
      if (email) {
        existingUser.email = email;
      }

      // Update the other fields regardless of whether email is present
      for (let key in mappedBody) {
        if (mappedBody[key] !== undefined && mappedBody[key] !== null) {
          existingUser[key] = mappedBody[key];
        }
      }

      await existingUser.save();
      console.log("doc updated");
    } else {
      // Create a new document if it doesn't exist
      console.log("created");
      const newUser = new Users(mappedBody);
      await newUser.save();
    }

    res.status(200).json({ message: "User updated or created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred.", error: err });
  }
};

// if (existingUser) {
//   // Update the document if it exists
//   existingUser.email = email;
//   await existingUser.save();
//   console.log("doc updated");
// } else {
//   // Create a new document if it doesn't exist
//   console.log("created");

//   const newUser = new User({ _id: id, email });
//   await newUser.save();
// }