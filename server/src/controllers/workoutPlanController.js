// const axios = require('axios');
import OpenAI from "openai";
import Users from "../models/usersModel.js";

export async function generateWorkoutPlan(req, res) {
  const userData = req.body;
  function getCurrentDayName() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    return dayName;
  }

  const currentDayy = getCurrentDayName();

  // console.log("Received user data: ", userData);
  const numberOfWeeks = 1;

  const age = userData["How old are you?"];
  const gender = userData["What is your gender"];
  const height = userData["Height"];
  const weight = userData["Weight"];
  const name = userData["What is your name?"];
  const injury = userData["Are any parts of your body injured?"];
  const fitnessLevel = userData["What is Your fitness level"];
  const goal = userData["Choose your goal"];
  const workouts = userData["Which areas would you like to focus on?"];
  const days = userData["How many days should the workout plan cover"];
  const equipment = userData["What equipment do you have access to?"];
  const time =
    userData["How much time can you commit to working out each day?"];

  console.log(workouts);

  const prompt = `
Generate a comprehensive ${numberOfWeeks}-week home workout plan formatted as an array of JSON objects. Each object represents one week, which contains an array of daily workout or rest day plans from Monday to Sunday. The plan should incorporate ${days} workout days per week, with the remaining days as rest days, according to the user's profile provided below:
number of workout days must equal to ${days}
${currentDayy} must be workout day
workout needs to have only reps or duration not both

User Profile:
- Fitness Level: ${fitnessLevel}
- Workout Goal: ${goal}
- Preferred Workouts: [${workouts.join(", ")}]
- Daily Time Commitment: ${time}
- Equipment Available: [${equipment.join(", ")}]
- Injuries ${injury}


You Must Use only the following workout names for the exercises:
- archer push up
-45° side bend
-air bike
-alternate heel touchers
-archer pull up
-back and forth step
-back lever
-bench dip (knees bent)
-bench dip on floor
-biceps leg concentration curl
-biceps narrow pull-ups
-biceps pull-up
-body-up
-bodyweight squatting row
-bodyweight standing calf raise
-bodyweight standing close-grip one arm row
-bottoms-up
-box jump down with one leg stabilization
-bridge - mountain climber (cross body)
-burpee
-butt-ups
-chest dip
-chest dip on straight bar
-chin-up
-clock push-up
-close grip chin-up
-close-grip push-up (on knees)
-cocoons
-crab twist toe touch
-cross body crunch
-crunch (hands overhead)
-crunch floor
-dead bug
-decline crunch
-decline push-up
-decline sit-up
-diamond push-up
-drop push up
-elbow dips
-elbow lift - reverse push-up
-elevator
-flag
-flutter kicks
-forward jump
-frog crunch


Guidelines for the Workout Plan Which Needs To Be Done Must! :

- Vary the workouts to target different body parts throughout the week and include appropriate rest between sets.
-  number of exercises for each day must be minimum 15 and maximum 20.
- You must return array of ${numberOfWeeks} weeks.
- return only array do not write any text .
- dont put array into quotes.
- you must return days array where you include workout days and rest days 
if it is rest day mark it as true.
- create workouts based on ${workouts}. 
- You must not create full body workout in targeted_body_part if it is not included in ${workouts}.  
- reps and duration corelation if reps has number make duration null and if duration has number in seconds make reps null but both of them needs to be in the object

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
              "name": "name of the workout",
              "sets": "number of sets",
              "reps": "number of reps",
              "duration" : "number of seconds for a workout"// if reps is ,
              "rest": "60",
              "calories": "number of calories burned based on the reps and sets and based on workout",
            },
          ]
        },
      ]
    },
`;

  // (model="gpt-4-1106-preview", response_format={ "type": "json_object" })

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: "You are a professional fitness assistant.",
        },
        { role: "user", content: prompt },
      ],
    });

    if (
      !chatCompletion.choices ||
      chatCompletion.choices.length === 0 ||
      !chatCompletion.choices[0].message
    ) {
      throw new Error("Invalid response structure from OpenAI API");
    }

    const result = chatCompletion.choices[0].message.content;
    const planArray = JSON.parse(result);

    console.log(planArray);
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
