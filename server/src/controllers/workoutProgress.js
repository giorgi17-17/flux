import Users from "../models/usersModel.js";

export const saveWorkoutProgress = async (req, res) => {
  //   console.log("Received body:", req.body);
  const { userId, dateOfWorkout } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "No user ID provided" });
    }

  //   console.log(`Saving workout progress for user with ID: ${userId}`);

  try {
    // Fetch the current user document

    const user = await Users.findById(userId);
    const updatedDateOfWorkouts = [
        dateOfWorkout,
      ...(user.userProgress.dateOfWorkouts || []),
    ];
    // const updatedUser = await user.save();
    // console.log(user.userProgress.dateOfWorkouts );
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $set: {
          userProgress: {
            dateOfWorkouts: [ ...updatedDateOfWorkouts],
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the userProgress field
    //   const updatedUserProgress = [...user.userProgress.completedWorkouts, workoutProgress];
    //   user.userProgress.completedWorkouts = updatedUserProgress;

    // Save the updated user document
    //   const updatedUser = await user.save();

    // console.log("Updated user progress:", user);
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
  const userId = req.params.userId;
  // console.log(req.params)
  // console.log(userId)
  try {


    const user = await Users.findById(userId);
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

}