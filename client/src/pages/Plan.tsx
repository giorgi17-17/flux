import { useEffect, useState } from "react";
import {
  getUserById,
  savePlanToDatabase,
  workoutPlan,
} from "../services/fetch";
import styles from "../styles/plan.module.css";

// type User = {
//   _id: string;
//   email: string;
//   workoutPlan: WeekPlan[];
// };

type Exercise = {
  name: string;
  sets: number;
  reps: string; // This can be a number or string, depending on if you use time duration for reps
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

export type PlanDay = RestDay | WorkoutDay;

const Plan = () => {
  const id = localStorage.getItem("myCustomId") || "";
  const [user, setUser] = useState<User  | null>(null);
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
        // console.log(userData)
        setPlan(userData.workoutPlan);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUser();
  }, [id]);

  const data = user?.formData;
  // console.log(user?.workoutPlan);
  // const generatePlan = async () => {
  //   if (data) {
  //     await workoutPlan(data).then((receivedPlan) => {
  //       setPlan(receivedPlan.plan);
  //       savePlanToDatabase(id,plan);  // Save the plan to the database
  //     }).catch((error) => {
  //       console.error("An error occurred:", error);
  //     });
  //   }
  // };

  const generatePlan = async () => {
    if (data) {
      await workoutPlan(data)
        .then((receivedPlan) => {
          setPlan(receivedPlan.plan);
          return receivedPlan.plan; // Return the received plan for the next promise
        })
        .then((receivedPlan) => {
          console.log("receivedPlan", receivedPlan);
          savePlanToDatabase(id, receivedPlan); // Save the plan to the database
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };

  // const generatePlan = async () => {
  //   if (data) {
  //     await workoutPlan(data).then((data) => {
  //       console.log(data)
  //       setPlan(data.plan)
  //     }).catch((error) => {

  //       console.error("An error occurred:", error);
  //     })
  //   }
  // }

  // console.log(typeof plan);
  console.log(plan);

  return (
    <div className={styles.container}>
      {plan.length > 0 ? (
         <div className={styles.planContainer}>
         <h2>Your Custom Plan</h2>
         {plan.map((week, index) => (
           <div key={index} className={styles.weekContainer}>
             <h3>{week.week}</h3>
             {week.days.map((day, dayIndex) => (
               <div key={dayIndex} className={styles.dayContainer}>
                 <strong>{day.day}:</strong> {day.rest_day ? "Rest Day" : day.targeted_body_part}
                 {day.exercises && (
                   <ul className={styles.ul}>
                     {day.exercises.map((exercise, exerciseIndex) => (
                       <li className={styles.li} key={exerciseIndex}>
                         {exercise.name} - {exercise.sets} sets of {exercise.reps}
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
