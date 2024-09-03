import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import styles from "../../styles/WorkoutAnalytics.module.css";
import { getUserByEmail } from "../../services/fetch";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  duration: number | null;
  calories: number;
}

interface WorkoutDay {
  date: string;
  workoutsCompleted: Exercise[];
}

interface UserData {
  email: string;
  formData: {
    Weight: string;
  };
  userProgress: {
    completedWorkouts: WorkoutDay[];
  };
}

type Props = {
  completedWorkouts: WorkoutDay[];
};

const WorkoutAnalytics: React.FC<Props> = ({ completedWorkouts = [] }) => {
  const { email } = useAuth();
  const [userWeight, setUserWeight] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserWeight = async () => {
      try {
        if (email) {
          const userData: UserData = await getUserByEmail(email);
          const weight = parseInt(userData.formData.Weight, 10);
          setUserWeight(weight || null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserWeight();
  }, [email]);

  const calculateDailyStats = () => {
    return completedWorkouts.map((workoutDay) => {
      const dailyStats = workoutDay.workoutsCompleted.reduce(
        (totals, exercise) => {
          const sets = Number(exercise.sets) || 0;
          const reps = Number(exercise.reps) || 0;
          const calories = Number(exercise.calories) || 0;

          return {
            totalSets: totals.totalSets + sets,
            totalReps: totals.totalReps + reps,
            totalCalories: totals.totalCalories + calories,
            totalWorkouts: totals.totalWorkouts + 1, // Count number of workouts
          };
        },
        { totalSets: 0, totalReps: 0, totalCalories: 0, totalWorkouts: 0 }
      );

      return {
        date: workoutDay.date,
        ...dailyStats,
      };
    });
  };

  const dailyStats = calculateDailyStats();

  return (
    <div className={styles.container}>
      <h2>Workout Analytics</h2>
      {userWeight && <p className={styles.weight}>User Weight: {userWeight} kg</p>}
      {dailyStats.length > 0 ? (
        dailyStats.map((entry) => (
          <div key={entry.date} className={styles.dateBox}>
            <p className={styles.date}>Date: {new Date(entry.date).toLocaleDateString()}</p>
            <p className={styles.totalSets}>Total Sets: {entry.totalSets}</p>
            <p className={styles.totalReps}>Total Reps: {entry.totalReps}</p>
            <p className={styles.totalCalories}>Total Calories Burned: {entry.totalCalories}</p>
            <p className={styles.totalWorkouts}>Number of Workouts: {entry.totalWorkouts}</p>
          </div>
        ))
      ) : (
        <p>No workout data available.</p>
      )}
    </div>
  );
};

export default WorkoutAnalytics;
