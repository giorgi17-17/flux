import Exercise from "../models/exerciseModel.js";

export const addExercise = async (req, res) => {
  const exercise = new Exercise(req.body);
  try {
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllExercises = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 1;
    let page = parseInt(req.query.page) || 1;
    
    // Initialize an empty query object
    let query = {};
    
    // Add properties to query object if they exist in req.query
    if (req.query.bodyPart && req.query.bodyPart !== "all") {
      query.bodyPart = req.query.bodyPart;
    }
    if (req.query.target) {
      query.target = req.query.target;
    }
    // Add more query parameters as needed
    // if (req.query.someOtherParameter) {
    //   query.someOtherParameter = req.query.someOtherParameter;
    // }
    
    // Perform the MongoDB query
    console.log(query)
    let exercise = await Exercise.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    // Handle response
    if (exercise.length > 0) {
      console.log(`Found`);
      res.status(200).json(exercise);
    } else {
      console.log("No exercise found ");
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
