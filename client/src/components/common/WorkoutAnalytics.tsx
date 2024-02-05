import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../services/helper";

type Exercise = {
  name: string;
  sets: string;
  reps: string;
};

type Props = {
  workoutData?: Exercise[] | undefined;
};


const getCaloriesBurned = async (exerciseName: string): Promise<number> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/workouts/${exerciseName}`);
      const exerciseDetails = response.data;
  
      // Convert caloriesBurnt to a number
      const caloriesBurned = parseInt(exerciseDetails.caloriesBurnt, 10) || 0;
  
      return caloriesBurned;
    } catch (error) {
      console.error("Error fetching exercise details:", error);
      throw error;
    }
  };
  

const WorkoutAnalytics: React.FC<Props> = ({ workoutData }) => {
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState<number>(0);

  useEffect(() => {
    const calculateTotalCaloriesBurned = async () => {
      if (workoutData) {
        const total = await Promise.all(
          workoutData.map(async (exercise) => {
            const caloriesBurned = await getCaloriesBurned(exercise.name);
            return caloriesBurned;
          })
        );

        setTotalCaloriesBurned(total.reduce((sum, calories) => sum + calories, 0));
      }
    };

    calculateTotalCaloriesBurned();
  }, [workoutData]);

  if (!workoutData) {
    return <div>No workout data available.</div>;
  }

  // Calculate total sets and total reps
  const totalSets = workoutData.reduce((sum, exercise) => {
    const sets = parseInt(exercise.sets);
    return isNaN(sets) ? sum : sum + sets;
  }, 0);

  const totalReps = workoutData.reduce((sum, exercise) => {
    const reps = parseInt(exercise.reps);
    return isNaN(reps) ? sum : sum + reps;
  }, 0);

  return (
    <div>
      <h2>Workout Analytics</h2>
      <p>Total Sets: {totalSets}</p>
      <p>Total Reps: {totalReps}</p>
      <p>Total Calories Burned: {totalCaloriesBurned}</p>
    </div>
  );
};

export default WorkoutAnalytics;
