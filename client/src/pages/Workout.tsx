import { useState, useEffect } from "react";
import { WorkoutComponent } from "../components/common/WorkoutComponent";
import { getUserById } from "../services/fetch";
import styles from "../styles/workout.module.css";
type WeekPlan = {
  week: string;
  days: DayPlan[];
};

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: number;
};

export type DayPlan = {
  day: string;
  rest_day: boolean;
  targeted_body_part?: string;
  exercises: Exercise[];
};

const Workout = () => {
  const [currentPlan, setCurrentPlan] = useState<DayPlan | null>(null);
  const userId = localStorage.getItem("myCustomId") || "";

  // This function will find the current day's plan.
  const getCurrentDayPlan = (
    plans: WeekPlan[],
    currentDate: Date
  ): DayPlan | null => {
    const currentDayName = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    for (const week of plans) {
      for (const day of week.days) {
        if (day.day === currentDayName && !day.rest_day) {
          return day; // Found the plan for the current day
        }
      }
    }
    return null; // No workout plan for today
  };

  useEffect(() => {
    const fetchUserAndPlan = async () => {
      try {
        const userData = await getUserById(userId);
        // Get current day plan right after setting the plan
        const todayPlan = getCurrentDayPlan(
          userData.workoutPlan.plan,
          new Date()
        );
        setCurrentPlan(todayPlan);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserAndPlan();
  }, [userId]);

  return (
    <div className={styles.container}>
      {currentPlan?.exercises && currentPlan.exercises.length > 0 ? (
        <WorkoutComponent plan={currentPlan} />
      ) : (
        <div>Today is a rest day. No exercises planned.</div>
      )}
    </div>
  );
};

export default Workout;
