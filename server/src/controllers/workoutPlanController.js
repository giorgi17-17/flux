// const axios = require('axios');
import OpenAI from "openai";
import Users from "../models/usersModel.js";

export async function generateWorkoutPlan(req, res) {
  const userData = req.body;

  console.log("Received user data: ", userData);

  const age = userData["How old are you?"];
  const name = userData["What is your name?"];
  const fitnessLevel = userData["What is Your fitness level"];
  const goal = userData["Choose your goal"];
  const workouts = userData["What is your preferred workouts?"];
  const days = userData["How many days should the workout plan cover"];
  const equipment = userData["What gym equipment do you have access to?"];
  const time =
    userData["How much time can you commit to working out each day?"];

  //   console.log("Preferred workouts are: ", workouts);
  //   const prompt = `
  //   Given the following user profile, generate a detailed 7-day home workout plan that should be formatted as an array of JSON objects. The array should cover each day from Monday to Sunday. The number of workout days should be ${time}, and the remaining days should be designated as rest days.

  //   Each JSON object in the array should represent a single day and should follow one of the following structures:

  //   For a rest day:
  //   {
  //     "day": "Name of the Day (e.g., Monday)",
  //     "rest_day": true
  //   }

  //   For a workout day:
  //   {
  //     "day": "Name of the Day (e.g., Tuesday)",
  //     "rest_day": false,
  //     "targeted_body_part": "Name of the targeted body part (e.g., abs, chest, arms)",
  //     "exercises": [
  //       {
  //         "name": "Name of the Exercise (e.g., Push-Up)",
  //         "sets": "Number of Sets",
  //         "reps": "Number of Reps or Time Duration (e.g., 30 seconds)"
  //       },
  //       // More exercises can be added here
  //     ]
  //   }

  //   Your task is to fill in the above structures based on the user's profile:

  //   Name: ${name},
  //   Age: ${age},
  //   Fitness Level: ${fitnessLevel},
  //   Goal: ${goal},
  //   Preferred Workouts: ${workouts.join(", ")}

  //   Note: Please ensure the workout plan is suited for someone at ${fitnessLevel} fitness level and aims to achieve the goal of ${goal}.
  // `;

  const prompt = `
Generate a comprehensive 4-week home workout plan formatted as an array of JSON objects. Each object represents one week, which contains an array of daily workout or rest day plans from Monday to Sunday. The plan should incorporate ${days} workout days per week, with the remaining days as rest days, according to the user's profile provided below:

User Profile:
- Name: ${name}
- Age: ${age}
- Fitness Level: ${fitnessLevel}
- Workout Goal: ${goal}
- Preferred Workouts: [${workouts.join(", ")}]
- Daily Time Commitment: ${time}
- Equipment Available: [${equipment.join(", ")}]

Guidelines for the Workout Plan:
- Tailor workouts to the user's ${fitnessLevel} fitness level.
- Focus on the user's goal of ${goal}.
- Plan home-based workouts that utilize available equipment.
- Vary the workouts to target different body parts throughout the week and include appropriate rest between sets.
- Provide a balanced plan that progressively challenges the user over the 4 weeks to prevent plateaus and encourage consistent improvement.
- Make number of exercises minimum 6 and maximum 20

Structure for JSON Objects:

Week Plan:
{
  "week": "Week Number (e.g., Week 1)",
  "days": [
    {
      "day": "Day Name (e.g., Monday)",
      "rest_day": true or false,
      "targeted_body_part": "Targeted Body Part (if not a rest day)",
      "exercises": [
        {
          "name": "Exercise Name (if not a rest day)",
          "sets": "Number of Sets",
          "reps": "Number of Reps or Duration",
          "rest": "Rest Time in seconds between sets"
        },
        // Additional exercises for the day
      ]
    },
    // Additional days for the week
  ]
}

Ensure each weekly plan increases in intensity or complexity to match the user's progression, and includes both warm-up before workouts and cool-down routines after workouts.
`;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [{ role: "user", content: prompt }],
    });
    const result = chatCompletion.choices[0].message.content;
    // console.log(JSON.parse(result));
    const planArray = JSON.parse(result);
    // const planArray = parsedResult.map((week) => ({
    //   ...week,
    //   days: week.days.map((day) => ({
    //     ...day,
    //   })),
    // }));

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
      { $set: { workoutPlan: workoutPlan } },
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
