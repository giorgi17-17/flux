import { useEffect, useState } from 'react';
import { getUserById, savePlanToDatabase, workoutPlan } from "../services/fetch";
import styles from "../styles/plan.module.css";

type User = {
  _id: string;
  email: string;
  formData: {
    [key: string]: string[];
  };
}

type Exercise = {
  duration: string;
  exercise_name: string;
  sets: number
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
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<PlanDay[]>([]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id); 
        setUser(userData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUser();
  }, [id]);

  const data = user?.formData;
  // console.log(data)
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
          return receivedPlan.plan;  // Return the received plan for the next promise
        })
        .then((receivedPlan) => {
          console.log("receivedPlan", receivedPlan)
          savePlanToDatabase(id, receivedPlan);  // Save the plan to the database
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
  
  console.log(typeof plan)
  console.log(plan)

  return (
    <div className={styles.container}>
      <div className={styles.title}>Workout Plan</div>
      <button className={styles.generateButton} onClick={generatePlan}>Generate Plan</button>
      { plan && (
        <div className={styles.planContainer}>
          <h2>Your Custom Plan</h2>
          <div className={styles.plan}>
            {plan.map(e => {
              // console.log(e)
              return (
                <div>
                  {e.day}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
