// const axios = require('axios');
import OpenAI from "openai";
import Users from "../models/usersModel.js";

export async function generateWorkoutPlan(req, res) {
  const userData = req.body;

  console.log("Received user data: ", userData);
  const numberOfWeeks = 2;

  const age = userData["How old are you?"];
  const name = userData["What is your name?"];
  const fitnessLevel = userData["What is Your fitness level"];
  const goal = userData["Choose your goal"];
  const workouts = userData["What is your preferred workouts?"];
  const days = userData["How many days should the workout plan cover"];
  const equipment = userData["What gym equipment do you have access to?"];
  const time =
    userData["How much time can you commit to working out each day?"];


  const prompt = `
Generate a comprehensive ${numberOfWeeks}-week home workout plan formatted as an array of JSON objects. Each object represents one week, which contains an array of daily workout or rest day plans from Monday to Sunday. The plan should incorporate ${days} workout days per week, with the remaining days as rest days, according to the user's profile provided below:

User Profile:
- Fitness Level: ${fitnessLevel}
- Workout Goal: ${goal}
- Preferred Workouts: [${workouts.join(", ")}]
- Daily Time Commitment: ${time}
- Equipment Available: [${equipment.join(", ")}]

Use only the following workout names for the exercises:
- Push-Up
- Plank
- Jumping Jacks
- Squats
- Mountain Climbers
- High Knees
- Burpees
- Jumping Lunges
- Russian Twists
- Leg Raises
- Lunges
- Tricep Dips
- Diamond Push-up
- Leg Lift
- Alt. Plank Crunch
- Leg Hold
- Flutter Kicks
- Heel Touches
- Extended Plank Walk
- Extended Plank
- Hollow Body Hold
- Bulgarian Split Squat
- Walk Out Push-Ups
- Reverse Plank

Guidelines for the Workout Plan:
- Vary the workouts to target different body parts throughout the week and include appropriate rest between sets.
- Provide a balanced plan that progressively challenges the user over the 
${numberOfWeeks} weeks to prevent plateaus and encourage consistent improvement.
-  number of exercises for each day mus be minimum 5 and maximum 15
You must return array of ${numberOfWeeks} weeks
return only array do not write any text 
dont put array into quotes
Workout Plan Structure:
    {
      "week": "Week 1",
      "days": [
        {
          "day": "Monday",
          "rest_day": false,
          "targeted_body_part": "Chest",
          "exercises": [
            {
              "name": "Push-Up",
              "sets": "3",
              "reps": "10",
              "rest": "60"
            },
          ]
        },
      ]
    },
`;
// (model="gpt-4-1106-preview", response_format={ "type": "json_object" })

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      // "response_format": {"type": "json_object"},
      messages: [
        { role: "system", content: "You are a helpful fitness assistant." },
        { role: "user", content: prompt },
      ],
      // functions: [{ name: "set_workout", parameters: schema }],
      // function_call: { name: "set_workout" },
    });
    if (
      !chatCompletion.choices ||
      chatCompletion.choices.length === 0 ||
      !chatCompletion.choices[0].message
    ) {
      throw new Error("Invalid response structure from OpenAI API");
    }

    const result = chatCompletion.choices[0].message.content;

    console.log(result);
    const planArray = JSON.parse(result);

    console.log(planArray);
    // console.log(chatCompletion.choices[0].message.content);
    res.json({
      message: "Workout plan generated",
      plan: planArray,
    });
  } catch (error) {
    console.error("Error with OpenAI:", error);
    res.status(500).json({ message: "Error generating workout plan" });
  }
}

export const saveWorkoutPlan = async (req, res) => {
  console.log("Received body:", req.body);
  const userId = req.params.id;
  const { workoutPlan } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "No user ID provided" });
  }

  console.log(`Saving workout plan for user with ID: ${userId}`);

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $set: { workoutPlan: workoutPlan, planStartDate: Date() } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated user:", updatedUser);
    return res.status(200).json({
      message: "Workout plan updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({
      message: "An error occurred while updating the workout plan",
      error: err,
    });
  }
};
