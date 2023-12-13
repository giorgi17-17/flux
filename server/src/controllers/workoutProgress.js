import Users from "../models/usersModel.js";

export const saveWorkoutProgress = async (req, res) => {
  const { email, dateOfWorkout } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure userProgress exists and has a dateOfWorkouts array
    if (!user.userProgress) {
      user.userProgress = { dateOfWorkouts: [] };
    } else if (!Array.isArray(user.userProgress.dateOfWorkouts)) {
      user.userProgress.dateOfWorkouts = [];
    }

    const updatedDateOfWorkouts = [
      dateOfWorkout,
      ...user.userProgress.dateOfWorkouts,
    ];

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      {
        $set: {
          userProgress: {
            dateOfWorkouts: updatedDateOfWorkouts,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Workout progress updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({
      message: "An error occurred while updating the workout progress",
      error: err,
    });
  }
};


export const getWorkoutProgress = async (req, res) => {
  const email = req.params.email;
  // console.log(req.params)
  console.log("get progress", email);
  try {
    const user = await Users.findOne({ email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Workout progress ",
      user: user.userProgress,
    });
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({
      message: "An error occurred while updating the workout progress",
      error: err,
    });
  }
};
