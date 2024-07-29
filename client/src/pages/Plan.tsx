import { useCallback, useEffect, useState } from "react";
import {
  getUserByEmail,
  getWorkoutProgress,
  // getUserById,
  // getWorkoutProgress,
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
  duration: number;
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

export type User = {
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

// type CurrentWeekDay = {
//   weekIndex: number;
//   dayIndex: number;
// };

type Workout = {
  date: string;
  workoutsCompleted: [];
};

export type PlanDay = RestDay | WorkoutDay;

type Plan = WeekPlan[];

const Plan = () => {
  const id = localStorage.getItem("myCustomId") || "";
  // const email = localStorage.getItem("email") || "";
  const { currentUser, email } = useAuth();
  console.log(email);
  console.log(currentUser);

  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planisGenerateing, setPlanisGenerateing] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);
  const [hasWorkedOutToday, setHasWorkedOutToday] = useState<boolean>(false);
  const [workoutProgress, setWorkoutProgress] = useState([]);
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const answers = localStorage.getItem("answers");

  // console.log(user);
  const navigate = useNavigate();
  // const userFormData = localStorage.getItem("formData") || "";
  // const parsed = JSON.parse(userFormData);
  // console.log(parsed);
  // console.log(plan)

  useEffect(() => {
    const today = new Date();
    workoutProgress.forEach((workout: Workout) => {
      const workoutDate = new Date(workout.date);
      if (
        workoutDate.getDate() === today.getDate() &&
        workoutDate.getMonth() === today.getMonth() &&
        workoutDate.getFullYear() === today.getFullYear()
      ) {
        setHasWorkedOutToday(true);
      }
    });
  }, [workoutProgress]);

  useEffect(() => {
    if (currentUser && answers === "true") {
      const fetchUserAndWorkoutData = async () => {
        try {
          const userData = await getUserByEmail(email || "");
          console.log(userData);
          const workoutData = await getWorkoutProgress(email || "");
          setUser(userData);
          setWorkoutProgress(workoutData?.user?.completedWorkouts ?? []);

          if (userData?.workoutPlan) {
            setPlan(userData.workoutPlan.plan);
            setPlanStartDate(new Date(userData.planStartDate));
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserAndWorkoutData();
    } else if (!currentUser && !email) {
      navigate("/register");
    } else if (answers !== "true") {
      navigate("/questions");
    }
  }, [currentUser, email, navigate, answers]);

  const toggleWeek = (index: number) => {
    setExpandedWeek(expandedWeek === index ? null : index);
  };

  // const calculateCurrentWorkoutDay = (plan: WeekPlan[], startDate: Date) => {
  //   let workoutDayCount = 0;
  //   let totalDays = 0;
  //   const currentDate = new Date();

  //   for (const week of plan) {
  //     for (const day of week.days) {
  //       totalDays++;
  //       const dayDiff = Math.ceil(
  //         (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  //       );
  //       if (dayDiff < totalDays) {
  //         setCurrentWorkoutDay(workoutDayCount);
  //         return;
  //       }
  //       if (!day.rest_day) {
  //         workoutDayCount++;
  //       }
  //     }
  //   }
  //   setCurrentWorkoutDay(workoutDayCount);
  // };

  // const updateCurrentWeekDay = (startDate: Date, plan: WeekPlan[]) => {
  //   const today = new Date();
  //   const diffTime = Math.abs(today.getTime() - new Date(startDate).getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   const weekIndex = Math.floor(diffDays / 7);
  //   const dayIndex = diffDays % 7;

  //   if (weekIndex < plan.length) {
  //     setCurrentWeekDay({ weekIndex, dayIndex });
  //     setCurrentWeekIndex(weekIndex);
  //   } else {
  //     setCurrentWeekDay(null); // Plan is completed or invalid date range
  //     setCurrentWeekIndex(null);
  //   }
  // };

  const getCurrentDayPlan = (
    plans: WeekPlan[],
    currentDate: Date
  ): DayPlan | null => {
    if (!Array.isArray(plans)) return null; // Add this check

    const currentDayName = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    for (const week of plans) {
      for (const day of week.days) {
        if (day.day === currentDayName && !day.rest_day) {
          return day;
        }
      }
    }
    return null;
  };

  const currentDayPlan = getCurrentDayPlan(plan, date);

  const generatePlan = useCallback(async () => {
    const data = user?.formData;
    console.log(data);
    if (!answers || !currentUser) {
      console.log(
        "Redirecting due to missing answers or user not being logged in."
      );
      return; // Early return if prerequisites are not met.
    }
    if (answers === "true" && currentUser) {
      const userFormData = localStorage.getItem("formData") || "";
      console.log(userFormData);
      // const parsed = JSON.parse(userFormData);
      console.log("almost");
      setPlanisGenerateing(true);
      if (data) {
        console.log("plan is genrating");
        try {
          const receivedPlan = await workoutPlan(data);
          await savePlanToDatabase(id, receivedPlan, planStartDate);
          setPlan(receivedPlan.plan);
          localStorage.setItem("planCreated", "true");
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setPlanisGenerateing(false);
        }
      } else {
        console.log("No data available for generating plan.");
      }
    }
  }, [answers, currentUser, id, planStartDate, user?.formData]);

  useEffect(() => {
    const planAlreadyGenerated = localStorage.getItem("planCreated");
    if (!planAlreadyGenerated && currentUser && answers) {
      generatePlan();
    }
  }, [generatePlan, currentUser, answers]);

  return (
    <div className={styles.loadingContainer}>
      {!isLoading ? (
        <div className={styles.container}>
          {currentUser ? (
            <div className={styles.container2}>
              {plan.length > 0 ? (
                <div className={styles.planContainer}>
                  <div className={styles.dayInfo}>
                    <div>
                      {!currentDayPlan && (
                        <p className={styles.restDay}>Today is a rest day.</p>
                      )}
                    </div>
                    {/* {currentWeekDay && plan[currentWeekDay.weekIndex] ? (
                      <div>
                        {currentDayPlan ? (
                          <p>Today is a rest day.</p>
                        ) : (
                          <p>Today is a workout day!</p>
                        )}
                      </div>
                    ) : (
                      <p>
                        Workout plan is not active for today or is completed.
                      </p>
                    )} */}
                    {/* <div>
                      {currentWeekIndex !== null && currentWorkoutDay > 0 ? (
                        <p>
                          Tt is your DAY {currentWorkoutDay} of week{" "}
                          {currentWeekIndex + 1}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </div> */}
                  </div>
                  {hasWorkedOutToday ? (
                    <div className={styles.hasWorkedOut}>
                      <h2>You can rest now</h2>
                      <p>Check Your progress from profile page</p>
                    </div>
                  ) : (
                    <div>
                      <Link className={styles.link} to={"/workout"}>
                        <button
                          className={styles.startWorkout}
                          disabled={hasWorkedOutToday}
                        >
                          Start Workout
                        </button>
                      </Link>
                    </div>
                  )}

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
                            <div className={styles.day}>
                              <strong>{day.day} -</strong>{" "}
                              {day.rest_day ? (
                                <div className={styles.restDay}>Rest Day</div>
                              ) : (
                                <div className={styles.targeted_body_part}>
                                  {day.targeted_body_part}
                                </div>
                              )}
                            </div>
                            {day.exercises && (
                              <div className={styles.ul}>
                                {day.exercises.map(
                                  (exercise, exerciseIndex) => (
                                    <div
                                      className={styles.li}
                                      key={exerciseIndex}
                                    >
                                      <div className={styles.exerciseName}>
                                        {exercise.name}
                                      </div>
                                      <div>
                                        {exercise.reps === null ? (
                                          <div>
                                            {exercise.sets} sets of{" "}
                                            {exercise.duration} seconds
                                          </div>
                                        ) : (
                                          <div>
                                            {exercise.sets} sets of{" "}
                                            {exercise.reps} reps
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {planisGenerateing && (
                    <div className={styles.planisGenerateing}>
                      It needs around 1 minute to generate a plan.
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <SignInOrRegister />
            </div>
          )}
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
