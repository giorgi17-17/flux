import { useState, useEffect } from "react";
import styles from "../styles/questions.module.css";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { PayloadType, registerUser, updateUser } from "../services/fetch";

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
    question: "Choose your goal",
    type: "radio",
    options: ["Loose Weight", "Gain musscle", "Get Shredded"],
  },
  {
    question: "How many days should the workout plan cover",
    type: "radio",
    options: ["1", "2", "3", "4", "5", "6", "7"],
  },
];

const Questions = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<Record<string, FormDataValue>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const storedUserId = localStorage.getItem("myCustomId");
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers") || "false")
  );
  const localAnswers = JSON.parse(localStorage.getItem("answers") || "false");
  // const answers = localStorage.getItem("answers");
  // const email = localStorage.getItem("email") || "false";

  // const localEmail = localStorage.getItem("email") || "false";
  // console.log(localStorage.getItem("email"));

  const localEmail = localStorage.getItem("email") || "false";
  // const parsedEmail = JSON.parse(localEmail)
  // console.log("parsed email",parsedEmail)

  localStorage.setItem("email", localEmail || "false");
  console.log("localEmail", localEmail);

  let parsedEmail: boolean | string;

  if (localEmail === "false") {
    parsedEmail = JSON.parse(localEmail);
  }else {
    parsedEmail = localEmail
  }



  useEffect(() => {
    if (!localStorage.getItem("answers")) {
      localStorage.setItem("answers", JSON.stringify(false));
    }
  }, []);

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
      console.log("last");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };



  if (localEmail && localAnswers) {
    console.log("update front test ");
  } else if (localAnswers && !localEmail) {
    console.log("register front test");
  }
  console.log("out ", localAnswers);

  const handleSubmit = async () => {
    localStorage.setItem("formData", JSON.stringify(formData || false));
    localStorage.setItem("answers", JSON.stringify(true));
    setAnswers(true);

    const updatedLocalAnswers = JSON.parse(
      localStorage.getItem("answers") || "false"
    );

    const payload: PayloadType = {
      _id: storedUserId,
      email: localEmail,
      formData,
    };


    if (parsedEmail && updatedLocalAnswers) {
      console.log("update front");
      updateUser(payload);
    } else if (updatedLocalAnswers && !parsedEmail) {
      console.log("register front");
      registerUser(payload);
    }

   
  };
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      {currentQuestionIndex < questions.length && !answers ? (
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
        <div className={styles.finished}>
          <div>You have completed all questions!</div>
          {!currentUser && (
            <div>
              <div>
                <h1>You need to sign in or register to see a workout plan</h1>
              </div>
              <div className={styles.buttons}>
                <Link to={"/register"}>
                  <button className={styles.register}>Register</button>
                </Link>
                <Link to={"/signIn"}>
                  <button className={styles.signIn}>Sign In</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {!answers && (
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
      )}
    </div>
  );
};

export default Questions;
