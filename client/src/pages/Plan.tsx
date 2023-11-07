import { useEffect, useState } from "react";
import {
  getUserById,
  savePlanToDatabase,
  workoutPlan,
} from "../services/fetch";
// import { WorkoutComponent } from "../components/common/WorkoutComponent";
import styles from "../styles/plan.module.css";
// import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
// type CalendarTileProperties = {
//   date: Date;
//   view: "month" | "year" | "decade" | "century";
// };

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest?: number;
};

type DayPlan = {
  day: string;
  rest_day: boolean;
  targeted_body_part?: string; // Optional, only include if it's not a rest day
  exercises?: Exercise[]; // Optional, only include if it's not a rest day
};

type WeekPlan = {
  week: string;
  days: DayPlan[];
};

type FormData = {
  [key: string]: string[];
};

type User = {
  _id: string;
  email: string;
  formData: FormData;
  workoutPlan: WeekPlan[];
};

type RestDay = {
  day: string;
  rest_day: true;
};

type WorkoutDay = {
  day: string;
  rest_day: false;
  targeted_body_part: string;
  exercises: Exercise[];
};

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export type PlanDay = RestDay | WorkoutDay;

// type DayOfWeek =
//   | "Sunday"
//   | "Monday"
//   | "Tuesday"
//   | "Wednesday"
//   | "Thursday"
//   | "Friday"
//   | "Saturday";

type Plan = WeekPlan[];

const Plan = () => {
  const id = localStorage.getItem("myCustomId") || "";
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState([]);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  // const [value, onChange] = useState<Value>(new Date());
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);

  console.log(generatedWorkoutPlan);
  const date = new Date();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
        // console.log(userData.workoutPlan[0].plan)

        setPlanStartDate(userData.planStartDate);
        setPlan(userData.workoutPlan.plan);
        console.log(userData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUser();
  }, [id]);
  //  const  o = [{}]

  // console.log(o)

  // const parse = JSON.parse(``)

  const data = user?.formData;

  const toggleWeek = (index: number) => {
    setExpandedWeek(expandedWeek === index ? null : index);
  };

  const generatePlan = async () => {
    if (data) {
      await workoutPlan(data)
        .then((receivedPlan) => {
          setGeneratedWorkoutPlan(receivedPlan);
          setPlan(receivedPlan.plan);

          savePlanToDatabase(id, receivedPlan, planStartDate); // Save the plan to the database
          console.log("receivedPlan", receivedPlan);
          return receivedPlan.plan; // Return the received plan for the next promise
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };



  // function tileContent({
  //   date,
  //   view,
  // }: CalendarTileProperties): JSX.Element | null {
  //   if (view === "month" && planStartDate) {
  //     // Get the workout dates for the 4 weeks starting from the planStartDate
  //     const workoutDates: Date[] = getWorkoutDates(plan, newdate);

  //     if (
  //       workoutDates.some(
  //         (workoutDate) =>
  //           workoutDate.getDate() === date.getDate() &&
  //           workoutDate.getMonth() === date.getMonth() &&
  //           workoutDate.getFullYear() === date.getFullYear()
  //       )
  //     ) {
  //       return <div className={styles.mySpecialDayMarker}>Workout</div>;
  //     }
  //   }

  //   return null;
  // }

  // const getWorkoutDates = (plans: Plan, startDate: Date): Date[] => {
  //   let dates: Date[] = [];
  //   console.log("start",startDate)
  //   // Calculate 4 weeks from the start date
  //   const endDate = new Date(startDate.getTime());
  //   endDate.setDate(startDate.getDate() + 7 * 4); // 4 weeks

  //   plans.forEach((plan) => {
  //     plan.days.forEach((day) => {
  //       if (!day.rest_day) {
  //         // Cast the string to a DayOfWeek type, assuming day.day is a valid DayOfWeek string
  //         const dayOfWeek = day.day as DayOfWeek;
  //         const date = getDateFromDayName(dayOfWeek, startDate, endDate);
  //         if (date) dates.push(...date);
  //       }
  //     });
  //   });

  //   // Filter out dates that are outside the 4-week range
  //   dates = dates.filter((date) => date >= startDate && date <= endDate);

  //   return dates;
  // };

  // const getDateFromDayName = (
  //   dayName: DayOfWeek,
  //   startDate: Date,
  //   endDate: Date
  // ): Date[] => {
  //   const days: DayOfWeek[] = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const dayIndex: number = days.indexOf(dayName);

  //   if (dayIndex === -1) return [];

  //   const date = new Date(startDate.getTime());
  //   const dates: Date[] = [];

  //   // Move to the first occurrence of the day
  //   while (date.getDay() !== dayIndex) {
  //     date.setDate(date.getDate() + 1);
  //   }

  //   // Add all the dates that are the given day of the week within the 4 weeks range
  //   while (date <= endDate) {
  //     dates.push(new Date(date));
  //     date.setDate(date.getDate() + 7);
  //   }

  //   return dates;
  // };
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
          console.log(day);
          return day; // Found the plan for the current day
        }
      }
    }
    return null; // No workout plan for today
  };
  getCurrentDayPlan(plan, date);



  

  return (
    <div className={styles.container}>
      {/* <WorkoutComponent
        exercise={currentPlan.exercises[currentExerciseIndex]}
        onComplete={handleExerciseComplete}
      /> */}

      {/* <Calendar onChange={onChange} value={value} tileContent={tileContent} /> */}
      {plan.length > 0 ? (
        <div className={styles.planContainer}>
          <button className={styles.startWorkout}>
            <Link className={styles.link} to={"/workout"}>
              Start Workout
            </Link>
          </button>
          <h2>Your Custom Plan</h2>
          {plan.map((week, index) => (
            <div
              key={index}
              className={`${styles.weekContainer} ${
                expandedWeek === index ? styles.color : styles.white
              }`}
            >
              <h3
                onClick={() => toggleWeek(index)}
                className={`${styles.weekTitle} ${
                  expandedWeek === index ? styles.fullWidth : styles.centered
                }`}
              >
                {week.week}
              </h3>
              {expandedWeek === index &&
                week.days.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    // className={styles.dayContainer}
                    className={`${styles.dayContainer} ${
                      expandedWeek === index
                        ? styles.expanded
                        : styles.collapsed
                    }`}
                  >
                    <strong>{day.day}:</strong>{" "}
                    {day.rest_day ? "Rest Day" : day.targeted_body_part}
                    {day.exercises && (
                      <ul className={styles.ul}>
                        {day.exercises.map((exercise, exerciseIndex) => (
                          <li className={styles.li} key={exerciseIndex}>
                            {exercise.name} - {exercise.sets} sets of {""}
                            {exercise.reps} reps
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className={styles.title}>Workout Plan</div>
          <button className={styles.generateButton} onClick={generatePlan}>
            Generate Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default Plan;
