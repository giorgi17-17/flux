import { useRef, useState } from "react";
import styles from "../../styles/workoutComponent.module.css";

// Assuming you have Exercise type defined as you did previously
import { DayPlan, Exercise } from "../../pages/Workout";
import {  saveWorkoutProgress } from "../../services/fetch";

type ExerciseComponentProps = {
  plan: DayPlan;
};

export const WorkoutComponent: React.FC<ExerciseComponentProps> = ({
  plan,
}) => {
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Store the timer ID
  const [remainingTime, setRemainingTime] = useState(0);
  const shouldExecuteTimer = useRef(true);
  const exercise: Exercise = plan.exercises[currentExerciseIndex];
  const setsToNumber = Number(exercise.sets);
const date  = new Date()
const id = localStorage.getItem("myCustomId") || "";

  const handleCompleteSet = () => {
    setSetsCompleted((prev) => {
      const newSetsCompleted = prev + 1;

      // If this was the last set, start the rest timer
      if (newSetsCompleted >= setsToNumber) {
        startRestTimer();
      }
      return newSetsCompleted;
    });
  };

  const onExerciseComplete = () => {
    clearRestTimer(); // Ensure the timer is cleared when moving to next exercise

    const nextIndex = currentExerciseIndex + 1;
    if (plan.exercises && nextIndex < plan.exercises.length) {
      setCurrentExerciseIndex(nextIndex);
      setSetsCompleted(0);
    } else {
      saveWorkoutProgress(id, date)
      console.log("save func")
        // All exercises completed, you may want to handle the end of the workout here
        setIsWorkoutComplete(true); // Set workout to completed when all exercises are done
    }
  };

  const startRestTimer = () => {
    const restTime = exercise.rest; // rest time in seconds
    setRemainingTime(restTime); // Set the initial remaining time
    shouldExecuteTimer.current = true;

    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          if (shouldExecuteTimer.current) {
            onExerciseComplete();
            console.log('first')
          }
          clearInterval(id);
          setTimerId(null);
          return 0; // Reset to 0 to avoid negative numbers
        }
        return newTime;
      });
    }, 1000); // Decrement every second

    setTimerId(id);
  };
  const clearRestTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null); // Clear the stored timer ID
      setRemainingTime(0);
    }
  };

  const skipTime = () => {
    shouldExecuteTimer.current = false; // Set the ref to false when skipping
    clearRestTimer(); // Clear the timeout immediately
    onExerciseComplete();
    setTimerId(null); // Clear the stored timer ID
  };


  return (
    <div className={styles.exerciseContainer}>
      <div className={styles.exerciseInfo}>
        <span>{exercise.name}</span>
        <span>
          {exercise.sets} sets of {exercise.reps} reps
        </span>
        {exercise.rest && <span>Rest: {exercise.rest} seconds</span>}
      </div>
      <div className={styles.exerciseActions}>
        <button
          onClick={handleCompleteSet}
          disabled={setsCompleted >= setsToNumber}
        >
          Complete Set
        </button>
      </div>
      <div>
        Sets Completed: {setsCompleted} / {setsToNumber}
      </div>
        <span>Rest Time Remaining: {remainingTime} seconds</span>
      <div></div>
      {timerId !== null && (
        <div>
          <button onClick={skipTime}>Next Exercise</button>
        </div>
      )}
      {isWorkoutComplete && (
        <div>
            Finished
        </div>
      )}
      {/* {setsCompleted === setsToNumber && (
        <div>
          <button
            onClick={onExerciseComplete}
            disabled={setsCompleted === setsToNumber}
          >
            Next Exercise
          </button>
        </div>
      )} */}
    </div>
  );
};

export default WorkoutComponent;
