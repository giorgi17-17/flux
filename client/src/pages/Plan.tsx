import { useEffect, useState } from "react";
import {
  getUserById,
  getWorkoutProgress,
  savePlanToDatabase,
  workoutPlan,
} from "../services/fetch";
import styles from "../styles/plan.module.css";
import { useAuth } from "../context/useAuth";

import "react-calendar/dist/Calendar.css";
import { Link, useNavigate } from "react-router-dom";
// import SignInOrRegister from "../components/common/SignInOrRegister";
import Loading from "../components/common/Loading";
import SignInOrRegister from "../components/common/SignInOrRegister";

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest?: number;
};

type DayPlan = {
  day: string;
  rest_day: boolean;
  targeted_body_part?: string;
  exercises?: Exercise[];
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

type CurrentWeekDay = {
  weekIndex: number;
  dayIndex: number;
};

type workoutProgress = {
  message: string;
  user: {
    dateOfWorkouts?: string[] | undefined;
  };
};

export type PlanDay = RestDay | WorkoutDay;

type Plan = WeekPlan[];

const Plan = () => {
  const initialWorkoutProgress: workoutProgress = {
    message: "",
    user: {
      dateOfWorkouts: [],
    },
  };
  const id = localStorage.getItem("myCustomId") || "";
  // const email = localStorage.getItem('email')
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planisGenerateing, setPlanisGenerateing] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);
  const [hasWorkedOutToday, setHasWorkedOutToday] = useState<boolean>(false);
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState(0);
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number | null>(null);
  const [workoutProgress, setWorkoutProgress] = useState<workoutProgress>(
    initialWorkoutProgress
  );
  const [currentWeekDay, setCurrentWeekDay] = useState<CurrentWeekDay | null>(
    null
  );
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const { currentUser } = useAuth();
const answers = localStorage.getItem("answers")

  const navigate = useNavigate();

  useEffect(() => {
    // if (currentUser === null && isLoading === false){
    //   navigate("/signIn");
    //   return; // Exit early if not authenticated and not loading
    // }
    const fetchUser = async () => {
      if (currentUser) {
        console.log(currentUser)
        try {
          const workoutData = await getWorkoutProgress(id);
          setWorkoutProgress(workoutData);

          const userData = await getUserById(id);
          setUser(userData);

          if (userData && userData.workoutPlan) {
            setPlan(userData.workoutPlan.plan);
            setPlanStartDate(userData.planStartDate);
            updateCurrentWeekDay(
              userData.planStartDate,
              userData.workoutPlan.plan
            );

            if (userData.planStartDate) {
              calculateCurrentWorkoutDay(
                userData.workoutPlan.plan,
                new Date(userData.planStartDate)
              );
            }
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
      // else {
      //   console.log(currentUser)
      //   navigate('/')
      // }
      setIsLoading(false);
    };

      fetchUser();
  }, [id, currentUser, navigate,isLoading]);

  const isDateMatch = (dateString: string) => {
    const workoutDate = new Date(dateString);
    const currentDate = new Date();

    // console.log(
    //   workoutDate.getDate() === currentDate.getDate() &&
    //     workoutDate.getMonth() === currentDate.getMonth()
    // );

    return (
      workoutDate.getDate() === currentDate.getDate() &&
      workoutDate.getMonth() === currentDate.getMonth()
    );
  };

  useEffect(() => {
    if (workoutProgress.user?.dateOfWorkouts) {
      setHasWorkedOutToday(
        workoutProgress.user.dateOfWorkouts.some(isDateMatch)
      );
      console.log("Has worked out today:", hasWorkedOutToday);
    }
  }, [workoutProgress.user?.dateOfWorkouts, hasWorkedOutToday]);

  const data = user?.formData;

  const toggleWeek = (index: number) => {
    setExpandedWeek(expandedWeek === index ? null : index);
  };

  const generatePlan = async () => {
    if(answers === "true"){
      setPlanisGenerateing(true);
      localStorage.setItem("planCreated", "true");
      if (data) {
        await workoutPlan(data)
          .then((receivedPlan) => {
            setPlan(receivedPlan.plan);
            setPlanisGenerateing(false);
  
            savePlanToDatabase(id, receivedPlan, planStartDate);
            return receivedPlan.plan; // Return the received plan for the next promise
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      }
    }else {
      navigate("/questions")
    }
   
  };
  const calculateCurrentWorkoutDay = (plan: WeekPlan[], startDate: Date) => {
    let workoutDayCount = 0;
    let totalDays = 0;
    const currentDate = new Date();

    for (const week of plan) {
      for (const day of week.days) {
        totalDays++;
        const dayDiff = Math.ceil(
          (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (dayDiff < totalDays) {
          setCurrentWorkoutDay(workoutDayCount);
          return;
        }
        if (!day.rest_day) {
          workoutDayCount++;
        }
      }
    }
    setCurrentWorkoutDay(workoutDayCount);
  };

  const updateCurrentWeekDay = (startDate: Date, plan: WeekPlan[]) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - new Date(startDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(diffDays / 7);
    const dayIndex = diffDays % 7;

    if (weekIndex < plan.length) {
      setCurrentWeekDay({ weekIndex, dayIndex });
      setCurrentWeekIndex(weekIndex);
    } else {
      setCurrentWeekDay(null); // Plan is completed or invalid date range
      setCurrentWeekIndex(null);
    }
  };

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
  getCurrentDayPlan(plan, date);

  return (
    <div className={styles.loadingContainer}>
      {!isLoading ? (
        <div className={styles.container}>
          {currentUser ? (
            <div className={styles.container2}>
              {plan.length > 0 ? (
                <div className={styles.planContainer}>
                  <div className={styles.dayInfo}>
                    {currentWeekDay && plan[currentWeekDay.weekIndex] ? (
                      <div>
                        {plan[currentWeekDay.weekIndex].days[
                          currentWeekDay.dayIndex
                        ].rest_day ? (
                          <p>Today is a rest day.</p>
                        ) : (
                          <p>Today is a workout day!</p>
                        )}
                      </div>
                    ) : (
                      <p>
                        Workout plan is not active for today or is completed.
                      </p>
                    )}
                    <div>
                      {currentWeekIndex !== null && currentWorkoutDay > 0 ? (
                        <p>
                          Tt is your DAY {currentWorkoutDay} of week{" "}
                          {currentWeekIndex + 1}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <Link className={styles.link} to={"/workout"}>
                    <button
                      className={styles.startWorkout}
                      disabled={hasWorkedOutToday}
                    >
                      Start Workout
                    </button>
                  </Link>
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
                          expandedWeek === index
                            ? styles.fullWidth
                            : styles.centered
                        }`}
                      >
                        {week.week}
                      </h3>
                      {expandedWeek === index &&
                        week.days.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`${styles.dayContainer} ${
                              day.day === currentDay ? styles.currentDay : "" // Apply the special style for the current day
                            } ${
                              expandedWeek === index
                                ? styles.expanded
                                : styles.collapsed
                            }`}
                          >
                            <strong>{day.day}:</strong>{" "}
                            {day.rest_day ? "Rest Day" : day.targeted_body_part}
                            {day.exercises && (
                              <ul className={styles.ul}>
                                {day.exercises.map(
                                  (exercise, exerciseIndex) => (
                                    <li
                                      className={styles.li}
                                      key={exerciseIndex}
                                    >
                                      {exercise.name} - {exercise.sets} sets of{" "}
                                      {""}
                                      {exercise.reps} reps
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {planisGenerateing ? (
                    <div className={styles.planisGenerateing}>
                      It needs around 1 minute to generate a plan.
                    </div>
                  ) : (
                    <div>
                      <div className={styles.title}>Workout Plan</div>
                      <button
                        className={styles.generateButton}
                        onClick={generatePlan}
                      >
                        Generate Plan
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ): (<div><SignInOrRegister /></div>)}
        </div>
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Plan;
