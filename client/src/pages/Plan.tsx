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
  const { currentUser, email } = useAuth();
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planIsGenerating, setPlanIsGenerating] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);
  const [hasWorkedOutToday, setHasWorkedOutToday] = useState<boolean>(false);
  const [workoutProgress, setWorkoutProgress] = useState([]);
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const answers = localStorage.getItem("answers");

  const navigate = useNavigate();
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

  const generatePlan = useCallback(async () => {
    if (!answers || !currentUser) {
      console.log("Redirecting due to missing answers or user not being logged in.");
      return;
    }

    const userFormData = localStorage.getItem("formData");
    if (!userFormData) {
      console.log("No form data available in localStorage.");
      return;
    }

    setPlanIsGenerating(true);
    try {
      const parsedFormData = JSON.parse(userFormData);
      console.log("Generating plan with data:", parsedFormData);
      const receivedPlan = await workoutPlan(parsedFormData);
      await savePlanToDatabase(id, receivedPlan, planStartDate);
      setPlan(receivedPlan.plan);
      localStorage.setItem("planCreated", "true");
    } catch (error) {
      console.error("An error occurred while generating the plan:", error);
    } finally {
      setPlanIsGenerating(false);
    }
  }, [answers, currentUser, id, planStartDate]);

  useEffect(() => {
    if (currentUser && answers === "true") {
      const fetchUserAndWorkoutData = async () => {
        try {
          const userData = await getUserByEmail(email || "");
          console.log("Fetched user data:", userData);

          if (userData?.workoutPlan) {
            setPlan(userData.workoutPlan.plan);
            setPlanStartDate(new Date(userData.planStartDate));
          } else {
            const planAlreadyGenerated = localStorage.getItem("planCreated");
            if (!planAlreadyGenerated) {
              generatePlan();
            }
          }

          const workoutData = await getWorkoutProgress(email || "");
          setWorkoutProgress(workoutData?.user?.completedWorkouts ?? []);
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
  }, [currentUser, email, navigate, answers, generatePlan]);

  const toggleWeek = (index: number) => {
    setExpandedWeek(expandedWeek === index ? null : index);
  };

  const getCurrentDayPlan = (
    plans: WeekPlan[],
    currentDate: Date
  ): DayPlan | null => {
    if (!Array.isArray(plans)) return null;

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
                          <p className={styles.restDay}>დღეს ისვენებ</p>
                        )}
                      </div>
                    
                    </div>
                    {hasWorkedOutToday ? (
                      <div className={styles.hasWorkedOut}>
                        <h2></h2>
                        <p>შეამოწმე შენი პროგრესი პროფილზე გადასვლით</p>
                      </div>
                    ) : (
                      <div>
                        <Link className={styles.link} to={"/workout"}>
                          <button
                            className={styles.startWorkout}
                            disabled={hasWorkedOutToday}
                          >
                            დაიწყე ვარჯიში
                          </button>
                        </Link>
                      </div>
                    )}

                    <h2>რუტინა</h2>
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
                          მთლიანი კვირა
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
                                  <div className={styles.restDay}>დასვენების დღე</div>
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
                                              {exercise.sets} სეტი {" "}
                                              {exercise.duration} წამი
                                            </div>
                                          ) : (
                                            <div>
                                              {exercise.sets} სეტი {" "}
                                              {exercise.reps} გამეორება
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
                    {planIsGenerating && (
                      <div className={styles.planisGenerateing}>
                        ერთ წუთში შენი რუტინა მზად იქნება.
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
