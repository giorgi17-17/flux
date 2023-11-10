import axios from "axios";
import { PlanDay } from "../pages/Plan";
// Define this at the top of your file, or in a types.ts file
type FormDataValue = string | number | boolean | string[];

export type PayloadType = {
  _id?: string | null;
  email: string;
  formData?: Record<string, FormDataValue>;
};

async function getAllExercises(
  limit: number,
  page: number,
  bodyPart: string,
  target: string
) {
  const options = {
    method: "GET",
    url: `http://localhost:5000/api/exercises/`,
    params: { limit, page, bodyPart, target },
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("eeee");

    throw error;
  }
}

async function getUserById(id: string) {
  // console.log("fetch", id);
  const options = {
    method: "GET",
    url: `http://localhost:5000/api/user/${id}`,
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("eeee");

    throw error;
  }
}
const workoutPlan = async (userData: object) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/workoutPlan",
      userData
    );

    return response.data;
  } catch (error) {
    console.error("AxiosError", error);
    throw error;
  }
};

const getWorkout = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/getWorkouts");

    return response.data;
  } catch (error) {
    console.error("AxiosError", error);
    throw error;
  }
};

async function saveWorkoutProgress(
  userId: string,
  dateOfWorkout: Date
  // exercisesCompleted: number
) {
  try {
    const response = await fetch("http://localhost:5000/api/workout/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        dateOfWorkout,
        // You can add additional workout information here if needed
      }),
    });
    console.log(userId, dateOfWorkout);

    if (!response.ok) {
      console.log("save func ok");

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Workout progress saved:", data);
    return data; // or you can return true to indicate success
  } catch (error) {
    console.error("Error saving workout progress:", error);
    return false; // or you can throw the error
  }
}

async function getWorkoutProgress(
  userId: string
  // exercisesCompleted: number
) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/getWorkoutProgress/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   userId,
        // }),
      }
    );

    if (!response.ok) {
      console.log("get func error");

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    // console.log("Workout progress saved:", data);
    return data; // or you can return true to indicate success
  } catch (error) {
    console.error("Error saving workout progress:", error);
    return false; // or you can throw the error
  }
}

const savePlanToDatabase = async (
  id: string,
  plan: PlanDay[],
  planStartDate: Date | null
) => {
  // const userId = user?._id;
  // Assuming you have the user object already
  // console.log(planStartDate)
  console.log("save fetch");
  console.log(" plan in fetch", plan);
  console.log(" date in fetch", planStartDate);
  console.log("iddd", id);
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${id}/savePlan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutPlan: plan,
          planStartDate: planStartDate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message); // Log the response message
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// api.js
const registerUser = async (payload: PayloadType) => {
  console.log("reg");
  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

const updateUser = async (payload: PayloadType) => {
  console.log("update");
  const response = await fetch("http://localhost:5000/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export {
  getAllExercises,
  getUserById,
  updateUser,
  registerUser,
  workoutPlan,
  savePlanToDatabase,
  getWorkout,
  saveWorkoutProgress,
  getWorkoutProgress,
};
