import React from "react";
import { Exercise } from "../../pages/Workouts";
import styles from "../../styles/workoutCards.module.css";
// import workoutImg from "../../assets/edgar-chaparro-sHfo3WOgGTU-unsplash.jpg";

type Props = {
  exercises: Exercise[];
  prevPage: () => void;
  nextPage: () => void;
};

const WorkoutCards: React.FC<Props> = ({ exercises, prevPage, nextPage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {exercises.map((exercise, index) => (
          <div key={index} className={styles.workoutCard}>
            <h3>{exercise.name}</h3>

            <p>
              <strong>Body Part:</strong> {exercise.bodyPart}
            </p>
            <p>
              <strong>Equipment:</strong> {exercise.equipment}
            </p>
            <p>
              <strong>Target:</strong> {exercise.target}
            </p>
            <p>
              <strong>Secondary Muscles:</strong>
              {exercise.secondaryMuscles.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={prevPage}>
          Back
        </button>
        <button className={styles.button} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkoutCards;
