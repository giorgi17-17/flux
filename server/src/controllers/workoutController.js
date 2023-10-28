import Workout from "../models/exerciseModel.js";
export const addWorkout = async (req, res) => {
  try {

    const workoutData = new Workout({
      ...req.body,
    });
    console.log(req.body);

    console.log("Exercise before save: ", workoutData);

    await workoutData.save();

    console.log("Exercise after save: ", workoutData);

    res.status(201).json(workoutData);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message });
  }
};

// export const getAllWorkouts = async (req, res) => {
//   try {
//     let limit = parseInt(req.query.limit) || 1;
//     let page = parseInt(req.query.page) || 1;

//     let query = {};

//     if (req.query.bodyPart && req.query.bodyPart !== "all") {
//       query.bodyPart = req.query.bodyPart;
//     }
//     if (req.query.target) {
//       query.target = req.query.target;
//     }

//     // Perform the MongoDB query
//     console.log(query);
//     let exercise = await Workout.find(query)
//       .limit(limit)
//       .skip((page - 1) * limit);

//     if (exercise.length > 0) {
//       console.log(`Found`);
//       res.status(200).json(exercise);
//     } else {
//       console.log("No exercise found ");
//       res.status(404).json({ message: "Exercise not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
