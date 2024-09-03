import { useRef, useState, useEffect } from "react";
import styles from "../../styles/workoutComponent.module.css";
import { DayPlan, Exercise } from "../../pages/Workout";
import { getWorkoutFromApi, saveWorkoutProgress } from "../../services/fetch";
import image from "../../assets/cagin-kargi-Qzp60FT380E-unsplash.jpg";
import { useAuth } from "../../context/useAuth";

type ExerciseComponentProps = {
  plan: DayPlan;
};

type WorkoutFromAPI = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
};

export const WorkoutComponent: React.FC<ExerciseComponentProps> = ({
  plan,
}) => {
  const [currentWorkout, setCurrentWorkout] = useState<Partial<WorkoutFromAPI>>(
    {}
  );
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [numberOfworkout, setNumberOfworkout] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const shouldExecuteTimer = useRef(true);
  const exercise: Exercise = plan.exercises[currentExerciseIndex];
  const setsToNumber = Number(exercise.sets);
  const date = new Date();

  const { email } = useAuth();

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Cleanup function to enable scrolling again
    return () => {
      document.body.style.overflow = "auto"; // or '' to remove the inline style
    };
  }, []);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        setLoading(true);
        const data = await getWorkoutFromApi(exercise.name);
        setCurrentWorkout(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchExerciseDetails();
  }, [exercise.name]);

  const handleCompleteSet = () => {
    setSetsCompleted((prev) => {
      const newSetsCompleted = prev + 1;
      if (newSetsCompleted) {
        startRestTimer();
      }
      return newSetsCompleted;
    });
  };

  const onExerciseComplete = () => {
    clearRestTimer();
    setNumberOfworkout((prev) => prev + 1);

    const nextIndex = currentExerciseIndex + 1;
    if (plan.exercises && nextIndex < plan.exercises.length) {
      setCurrentExerciseIndex(nextIndex);
      setSetsCompleted(0);
    } else {
      saveWorkoutProgress(email || "", date, plan.exercises);
      setIsWorkoutComplete(true);
    }
  };

  const startRestTimer = () => {
    const restTime = exercise.rest;
    setRemainingTime(restTime);
    shouldExecuteTimer.current = true;

    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(id);
          setTimerId(null);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    setTimerId(id);
  };

  const clearRestTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
      setRemainingTime(0);
    }
  };

  const skipTime = () => {
    shouldExecuteTimer.current = false;
    clearRestTimer();
    setTimerId(null);
  };

  return (
    <div className={styles.exerciseContainer}>
      <div
        className={`
         ${
           timerId !== null && setsCompleted !== setsToNumber
             ? styles.restContainerTrue
             : styles.restContainerFalse
         }
        `}
      ></div>
      {timerId !== null && (
        <div className={styles.rest}>
          <p>Rest {remainingTime} </p>
          <button className={styles.skip} onClick={skipTime}>
            Skip Time
          </button>
        </div>
      )}

      <div className={styles.exerciseInfo}>
        {loading ? (
          <div>
            <p>LOADING...</p>
          </div>
        ) : (
          <div className={styles.workout}>
            <div className={styles.repsAndSets}>
              <p>
                {numberOfworkout}/{plan.exercises.length}
              </p>
              <div>
                Sets: {setsCompleted} / {setsToNumber}
              </div>
            </div>
            <div className={styles.video}>
              <img
                src={currentWorkout.gifUrl || image}
                alt={currentWorkout.name || "Exercise"}
              />
            </div>

            <div className={styles.workoutInfo}>
              <div className={styles.upSection}>
                <p className={styles.name}>{currentWorkout.name}</p>
                <p className={styles.name}>Cal: {exercise.calories}</p>
                {/* <p className={styles.name}>
                  Body Part: {currentWorkout.bodyPart}
                </p> */}
              </div>

              <div className={styles.repsOrDuration}>
                {exercise.reps === null ? (
                  <div>
                    <p className={styles.reps}>{exercise.duration} Sec</p>
                  </div>
                ) : (
                  <div>
                    <p className={styles.reps}>{exercise.reps} Reps</p>
                  </div>
                )}
              </div>
              {/* <p className={styles.name}>Target: {currentWorkout.target}</p> */}
              {/* <p className={styles.name}>
                Body Part: {currentWorkout.bodyPart}
              </p> */}
              {/* <p className={styles.name}>
                Equipment: {currentWorkout.equipment}
              </p> */}
              {/* <div className={styles.done}>
                <button
                  onClick={handleCompleteSet}
                  disabled={setsCompleted >= setsToNumber}
                >
                  DONE
                </button>
              </div> */}

              {timerId === null && setsCompleted >= setsToNumber ? (
                <div className={styles.nextExercise}>
                  {!isWorkoutComplete && (
                    <button onClick={onExerciseComplete}>Next Exercise</button>
                  )}
                </div>
              ) : (
                <div className={styles.done}>
                  <button
                    onClick={handleCompleteSet}
                    disabled={setsCompleted >= setsToNumber}
                  >
                    DONE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isWorkoutComplete && <div>Finished</div>}
    </div>
  );
};

export default WorkoutComponent;
