import React, { useState } from "react";
import styles from "../styles/questions.module.css";
// type FormDataItem = {
//   question: string;
//   answer: string | string[];
// };

// type FormDataArray = FormDataItem[];

type Question = {
  question: string;
  type: "text" | "number" | "radio" | "checkbox";
  options?: string[];
};
type FormDataValue = string | number | boolean | string[];

const questions: Question[] = [
  {
    question: "What is your name?",
    type: "text",
  },
  {
    question: "How old are you?",
    type: "number",
  },
  {
    question: "Choose your goal",
    type: "radio",
    options: ["Loose Weight", "Gain musscle", "Get Shredded"],
  },
  {
    question: "What is Your fitness level",
    type: "radio",
    options: ["Beginer", "Intermediate", "Advanced"],
  },
  {
    question: "What is your preferred workouts?",
    type: "checkbox",
    options: ["Cardio", "Strength", "Yoga"],
  },
  {
    question: "How many days should the workout plan cove",
    type: "radio",
    options: ["1", "2", "3", "4", "5", "6", "7"],
  },
];

const Questions = () => {
  const [formData, setFormData] = useState<Record<string, FormDataValue>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string
  ) => {
    setFormData({
      ...formData,
      [question]: e.target.value,
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string
  ) => {
    const value = e.target.checked;
    const prevValues = (formData[question] as string[]) || [];
    setFormData({
      ...formData,
      [question]: value
        ? [...prevValues, e.target.value]
        : prevValues.filter((item: string) => item !== e.target.value),
    });
  };

  const isInputValid = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentValue = formData[currentQuestion.question];
    return currentValue !== undefined && currentValue !== "";
  };

  const handleNext = () => {
    if (!isInputValid()) {
      alert("Please fill in the required field");
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // const userData = {
  //   name: 'John',
  //   age: 32,
  //   fitnessLevel: 'Intermediate',
  //   preferredWorkouts: ['Strength', 'Cardio'],
  //   days: 3,
  // };

  const saveUserPlan = async (formData: Record<string, FormDataValue>) => {
    console.log("func activated");
    const response = await fetch("http://localhost:5000/api/addUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
    saveUserPlan(formData);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      {currentQuestionIndex < questions.length && !isFinished ? (
        <div className={styles.questionContainer}>
          <label className={styles.label}>{currentQuestion.question}</label>
          {currentQuestion.type !== "checkbox" &&
          currentQuestion.type !== "radio" ? (
            <input
              type={currentQuestion.type}
              onChange={(e) => handleChange(e, currentQuestion.question)}
              className={styles.input}
              required
            />
          ) : null}

          {currentQuestion.type === "checkbox"
            ? currentQuestion.options?.map((option, i) => (
                <div key={i} className={styles.option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={
                      (
                        formData[currentQuestion.question] as string[]
                      )?.includes(option) || false
                    }
                    onChange={(e) =>
                      handleCheckboxChange(e, currentQuestion.question)
                    }
                    className={styles.input}
                  />
                  <label className={styles.p}>{option}</label>
                </div>
              ))
            : null}

          {currentQuestion.type === "radio"
            ? currentQuestion.options?.map((option, i) => (
                <div key={i} className={styles.option}>
                  <input
                    type="radio"
                    name={currentQuestion.question}
                    value={option}
                    onChange={(e) => handleChange(e, currentQuestion.question)}
                    className={styles.input}
                  />
                  <label className={styles.p}>{option}</label>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div className={styles.finished}>You have completed all questions!</div>
      )}
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.nextButton}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={styles.nextButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
